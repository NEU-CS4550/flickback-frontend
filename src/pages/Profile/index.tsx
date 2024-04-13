import { api } from "@/utils/api";
import { User } from "@/utils/types";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "@/components/Button";
import { LuSettings, LuUserX, LuUserPlus } from "react-icons/lu";
import { useAuth } from "@/utils/auth";

import "./styles.css";

export default function Profile() {
  const navigate = useNavigate();
  const { profileId } = useParams();
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);

  const follow = () => {
    if (!profile || !user) return;
    api.post(`/users/${profileId}/follow`).then(() => {
      setProfile({
        ...profile,
        followers: [...profile.followers, user.user.id],
      });
      setUser({
        ...user,
        following: [...user.following, profileId],
      });
    });
  };

  const unfollow = () => {
    if (!profile || !user) return;
    api.post(`/users/${profileId}/unfollow`).then(() => {
      //profile.followers = profile.followers.filter((id) => id !== user.user.id);
      setProfile({
        ...profile,
        followers: profile.followers.filter((id) => id !== user.user.id),
      });
      setUser({
        ...user,
        following: user.followers.filter((id) => id !== profileId),
      });
    });
  };

  useEffect(() => {
    if (profileId) {
      api
        .get(`users/${profileId}/profile`)
        .then((response) => {
          setProfile(response.data);
        })
        .catch(() => {
          navigate("/404");
        });
    } else {
      if (!user) return;
      setProfile(user);
    }
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
              <Button icon onClick={unfollow}>
                <LuUserX className="text-xl" />
                Unfollow
              </Button>
            ) : (
              <Button icon onClick={follow}>
                <LuUserPlus className="text-xl" />
                Follow
              </Button>
            ))
          ) : (
            <Link to="/settings">
              <Button icon>
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
