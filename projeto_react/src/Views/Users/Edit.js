import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const supabaseUrl = "https://wvljndxyaidxngxzfmyc.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bGpuZHh5YWlkeG5neHpmbXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NDUsImV4cCI6MjA2OTkyNjg0NX0.KYntjFPUrdxUWrSVdiE4XGmpSn_mRDrsZhEt3JukZB8";
const supabase = createClient(supabaseUrl, supabaseKey);

function ProfileEdit() {
    const nav = useNavigate();

    const [user, setUser] = useState({
        phone: "",
        name: "",
        last_name: "",
    });

    const [editingField, setEditingField] = useState(null); // controla qual campo está sendo editado
    const [newPassword, setNewPassword] = useState("");

    // Busca usuário logado ao carregar a tela
    useEffect(() => {
        async function fetchUser() {
            const { data: authUser } = await supabase.auth.getUser();
            const uid = authUser?.user?.id;
            if (!uid) return;

            let { data: dataUser, error } = await supabase
                .from("users")
                .select("*")
                .eq("auth_id", uid)
                .single();

            if (error) console.error(error);
            else setUser(dataUser);
        }

        fetchUser();
    }, []);

    async function updateProfile() {
        const { data: dataUser } = await supabase.auth.getUser();
        const uid = dataUser?.user?.id;
        if (!uid) {
            console.error("Usuário não autenticado");
            return;
        }

        const senduser = {
            phone: user.phone,
            name: user.name,
            last_name: user.last_name,
        };

        const { error: eU } = await supabase
            .from("users")
            .update(senduser)
            .eq("auth_id", uid);

        if (eU) {
            console.error("Erro ao atualizar usuário:", eU.message);
        }


        if (newPassword) {
            const { error: passError } = await supabase.auth.updateUser({
                password: newPassword,
            });
            if (passError) {
                console.error("Erro ao atualizar senha:", passError.message);
            }
        }

        setEditingField(null);
        setNewPassword("");
        nav(`/profile/${uid}`);
    }

    return (
        <div className="backgroundScreen">
            <div className="editScreen">
                <div>
                    <label className="labelEdit">Nome:</label>
                    {editingField === "name" ? (
                        <input
                            type="text"
                            value={user.name || ""}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            onBlur={() => setEditingField(null)}
                        />
                    ) : (
                        <span>
                            {" "}{user.name}{" "}
                            <button className="buttonEdit" onClick={() => setEditingField("name")}><i class="fa-solid fa-pen-to-square"></i></button>
                        </span>
                    )}
                </div>

                <div>
                    <label className="labelEdit">Sobrenome:</label>
                    {editingField === "last_name" ? (
                        <input
                            type="text"
                            value={user.last_name || ""}
                            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
                            onBlur={() => setEditingField(null)}
                        />
                    ) : (
                        <span>
                            {" "}{user.last_name}{" "}
                            <button className="buttonEdit" onClick={() => setEditingField("last_name")}><i class="fa-solid fa-pen-to-square"></i></button>
                        </span>
                    )}
                </div>

                <div>
                    <label className="labelEdit">Telefone:</label>
                    {editingField === "phone" ? (
                        <input
                            type="tel"
                            value={user.phone || ""}
                            onChange={(e) => setUser({ ...user, phone: e.target.value })}
                            onBlur={() => setEditingField(null)}
                        />
                    ) : (
                        <span>
                            {" "}{user.phone}{" "}
                            <button className="buttonEdit" onClick={() => setEditingField("phone")}><i class="fa-solid fa-pen-to-square"></i></button>
                        </span>
                    )}
                </div>

                <div>
                    <label className="labelEdit">Senha:</label>
                    {editingField === "password" ? (
                        <input
                            type="password"
                            minLength={6}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            onBlur={() => setEditingField(null)}
                        />
                    ) : (
                        <span>
                            ********
                            <button className="buttonEdit" onClick={() => setEditingField("password")}><i class="fa-solid fa-pen-to-square"></i></button>
                        </span>
                    )}
                </div>
            </div>
            <br />
            <button className="buttonBase" onClick={updateProfile}>
                SALVAR
            </button>
        </div>
    );
}

export default ProfileEdit;
