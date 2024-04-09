import { api } from "@/utils/api";
import { User } from "@/utils/types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "@/components/Button";
import { LuSettings, LuUserX, LuUserPlus } from "react-icons/lu";
import { useAuth } from "@/utils/auth";

import "./styles.css";

export default function Profile() {
  const { profileId } = useParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);

  const follow = () => {
    if (!profile || !user) return;
    api.post(`/users/${profileId}/follow`).then(() => {
      profile.followers = [...profile.followers, user.user.id];
    });
  };

  const unfollow = () => {
    if (!profile || !user) return;
    api.post(`/users/${profileId}/unfollow`).then(() => {
      profile.following = profile.followers.filter((id) => id !== user.user.id);
    });
  };

  useEffect(() => {
    const query = profileId ? `users/${profileId}` : "";
    api.get(`${query}/profile`).then((response) => {
      setProfile(response.data);
    });
  }, []);

  return (
    profile && (
      <div className="Profile container mx-auto">
        <div className="Profile__head">
          <img src={profile.user.pfp} />
          <span className="Profile__username">{profile.user.username}</span>
          <div className="flex gap-3 mb-5">
            <span>{profile.followers.length} Followers</span>
            <span>{profile.following.length} Following</span>
          </div>
          {profileId ? (
            user &&
            (profile.followers.includes(user.user.id) ? (
              <Button icon="true" onClick={unfollow}>
                <LuUserX className="text-xl" />
                Unfollow
              </Button>
            ) : (
              <Button icon="true" onClick={follow}>
                <LuUserPlus className="text-xl" />
                Follow
              </Button>
            ))
          ) : (
            <Link to="/settings">
              <Button icon="true">
                <LuSettings className="text-xl" />
                Settings
              </Button>
            </Link>
          )}
        </div>
      </div>
    )
  );
}
