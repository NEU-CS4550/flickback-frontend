import { useEffect, useState } from "react";
import "./styles.css";
import { api } from "@/utils/api";
import { User } from "@/utils/types";
import Button from "@/components/Button";
import { LuCheck, LuPencil, LuTrash2, LuX } from "react-icons/lu";
import { useAlert } from "@/utils/alert";
import { useAuth } from "@/utils/auth";
import debounce from "@/utils/debounce";

export default function Admin() {
  const [users, setUsers] = useState<User[]>([]);
  const [editing, setEditing] = useState<string | false>(false);
  const [username, setUsername] = useState("");
  const { user, getUser } = useAuth();
  const { alert } = useAlert();

  const updateUsername = (userId: string) => {
    api
      .post(`/admin/update/${userId}`, { username })
      .then(() => {
        setUsers(
          users.map((u) => {
            if (u.id == userId) {
              return {
                ...u,
                username,
              };
            }
            return u;
          })
        );
        if (user && userId == user.id) {
          getUser();
        }
        alert("success", "Updated username successfully.");
      })
      .catch((e) => {
        alert("error", e);
      });
  };

  const deleteUser = (userId: string) => {
    api.delete(`/admin/delete/${userId}`).then(() => {
      setUsers(users.filter((u) => u.id != userId));
    });
  };

  useEffect(() => {
    api.get("/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    user && (
      <div className="Admin container mx-auto">
        <span className="text-2xl font-bold">User Table</span>
        <div className="Admin__table">
          {users.map((u, i) => {
            return (
              <div key={i} className="Admin__table__row">
                {u.id == user.id && <span className="Admin__you">(You)</span>}
                <input
                  className="Admin__table__info"
                  value={editing == u.id ? username : u.username}
                  disabled={editing != u.id}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <div className="Admin__table__actions">
                  {editing == u.id ? (
                    <>
                      {username != u.username && (
                        <Button
                          onClick={() => {
                            updateUsername(u.id);
                            setEditing(false);
                          }}
                        >
                          <LuCheck />
                        </Button>
                      )}
                      <Button
                        onClick={() => {
                          setEditing(false);
                        }}
                      >
                        <LuX />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={(e) => {
                          setUsername(u.username);
                          setEditing(u.id);
                          const input = e.currentTarget.parentElement
                            ?.previousSibling as HTMLInputElement;
                          debounce(() => {
                            console.log(input);
                            input.focus();
                          }, 1)();
                        }}
                      >
                        <LuPencil />
                      </Button>
                      {u.id != user.id && (
                        <Button
                          onClick={() => {
                            deleteUser(u.id);
                          }}
                        >
                          <LuTrash2 />
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}
