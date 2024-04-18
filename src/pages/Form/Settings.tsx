import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { useAuth } from "@/utils/auth";
import { useNavigate } from "react-router-dom";
import { useAlert } from "@/utils/alert";
import Button from "@/components/Button";
import Input from "@/components/Input";

import "./styles.css";

export default function Settings() {
  const navigate = useNavigate();
  const { user, getUser } = useAuth();
  const { alert } = useAlert();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const update = () => {
    if (!password || !confirmPassword) {
      alert("error", "Missing required fields.");
      return;
    }
    if (password && password != confirmPassword) {
      alert("error", "New passwords must match.");
      return;
    }
    api
      .put("/auth/update", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.type == "success") {
          alert("success", "Account settings updated.");
          getUser();
          setPassword("");
          setConfirmPassword("");
        } else {
          alert(response.data.type, response.data.message);
        }
      });
  };

  useEffect(() => {
    if (!user) return;
    setUsername(user.username);
  }, []);

  return (
    <div className="Settings">
      <div className="Form">
        <span className="Form__label">Settings</span>
        <Input
          name="username"
          label="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          autoComplete="off"
          disabled
        />
        <Input
          name="currpassword"
          type="password"
          label="New Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          autoComplete="off"
        />
        <Input
          name="confpassword"
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          autoComplete="off"
        />
        <div className="flex gap-3 justify-center">
          <Button onClick={update}>Save</Button>
          <Button
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
