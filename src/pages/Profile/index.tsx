import { api } from "@/utils/api";
import { Rating as RatingT, User } from "@/utils/types";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LuSettings, LuUserX, LuUserPlus, LuKeyRound } from "react-icons/lu";
import { useAuth } from "@/utils/auth";
import Rating from "@/components/Rating";
import Button from "@/components/Button";

import "./styles.css";

export default function Profile() {
  const navigate = useNavigate();
  const { profileId } = useParams();
  const { user } = useAuth();

  const [profile, setProfile] = useState<User>();
  const [following, setFollowing] = useState<User[]>([]);
  const [followers, setFollowers] = useState<User[]>([]);

  const [ratings, setRatings] = useState<RatingT[]>([]);
  const [ready, setReady] = useState(false);

  const follow = () => {
    if (!profileId! || !user) return;
    api.post(`/actions/follow/${profileId}`).then(() => {
      setFollowers([...followers, user]);
    });
  };

  const unfollow = () => {
    if (!profileId || !user) return;
    api.post(`/actions/unfollow/${profileId}`).then(() => {
      setFollowers(followers.filter((follower) => follower.id !== user.id));
    });
  };

  const getProfile = async () => {
    if (!profileId && !user) throw new Error();
    if (user && profileId == user.id) navigate("/profile");
    const query = profileId ?? user?.id;

    const apiProfile = await api
      .get(`users/${query}/profile`)
      .then((response: any) => {
        return response.data;
      });
    const apiFollowers = await api
      .get(`users/${query}/followers`)
      .then((response: any) => {
        return response.data;
      });
    const apiFollowing = await api
      .get(`users/${query}/following`)
      .then(async (response) => {
        return response.data;
      });

    const apiRatings = await api
      .get(`users/${query}/ratings`)
      .then((response) => {
        return response.data;
      });

    //setAdmin();
    setProfile(apiProfile);
    setFollowers(apiFollowers);
    setFollowing(apiFollowing);
    setRatings(apiRatings);
    setReady(true);
  };

  useEffect(() => {
    try {
      getProfile();
    } catch (e) {
      navigate("/404");
    }
  }, [user, profileId]);

  return (
    ready &&
    profile && (
      <div className="Profile container mx-auto">
        <div className="Profile__head">
          <img src={profile.pfp} />
          <span className="Profile__username">{profile.username}</span>
          <div className="flex gap-3 mb-5">
            <span>{followers.length} Followers</span>
            <span>{following.length} Following</span>
          </div>
          <div className="flex gap-3">
            {profileId && user ? (
              followers.find((follower) => follower.id == user.id) ? (
                <Button icon onClick={unfollow}>
                  <LuUserX className="text-xl" />
                  Unfollow
                </Button>
              ) : (
                <Button icon onClick={follow}>
                  <LuUserPlus className="text-xl" />
                  Follow
                </Button>
              )
            ) : user ? (
              <>
                {user.role == "ADMIN" && (
                  <Link to="/admin">
                    <Button icon>
                      <LuKeyRound className="text-xl" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Link to="/settings">
                  <Button icon>
                    <LuSettings className="text-xl" />
                    Settings
                  </Button>
                </Link>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="Profile__body flex-col md:flex-row-reverse items-center md:items-start">
          {(user && followers.find((follower) => follower.id == user.id)) ||
          (user && user.id == profile.id) ? (
            <>
              {(followers.length > 0 || following.length > 0) && (
                <div className="Profile__follows w-full md:w-auto">
                  <div>
                    <span className="text-lg">
                      <b>({followers.length})</b> Followers
                    </span>
                    <div className="Profile__follows__list mb-10 md:max-w-28">
                      {followers.map((follower, i) => {
                        return (
                          <Link key={i} to={"/users/" + follower.id}>
                            <div
                              className="Profile__follower"
                              style={{
                                backgroundImage: `url(${follower.pfp})`,
                              }}
                            ></div>
                          </Link>
                        );
                      })}
                    </div>
                    <span className="text-lg">
                      <b>({following.length})</b> Following
                    </span>
                    <div className="Profile__follows__list">
                      {following.map((followee, i) => {
                        return (
                          <Link key={i} to={"/users/" + followee.id}>
                            <div
                              className="Profile__follower"
                              style={{
                                backgroundImage: `url(${followee.pfp})`,
                              }}
                            ></div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
              <div
                className={
                  "Profile__ratings" +
                  (ratings.length > 0 ? "" : " text-center")
                }
              >
                <span className="text-2xl font-bold">
                  {ratings.length > 0 ? "Activity Feed" : "No Activity Yet"}
                </span>
                <div className="Profile__ratings__list">
                  {ratings.map((rating: RatingT, i) => {
                    return (
                      <div key={i}>
                        <span className="Profile__rating__label">
                          {new Date(rating.submitted).toLocaleDateString(
                            "en-US"
                          )}
                          <br />
                          <b>{rating.username}</b> rated{" "}
                          <i>{rating.movieName}</i>
                        </span>
                        <Link to={`/movies/${rating.movieId}`}>
                          <Rating rating={rating} concise />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <span className="Profile__private text-lg">
              You must {!user && "login and"} follow {profile.username} to view
              their profile.
            </span>
          )}
        </div>
      </div>
    )
  );
}
