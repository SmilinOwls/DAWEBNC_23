import React, { useState, useEffect } from "react";
import { Button, Card, Skeleton } from "antd";
import logo from "../../Assets/images/Logo.jpg";
import { useParams, useLocation, useHistory } from "react-router-dom";
import classroomApi from "../../Services/classroomApi";

const { Meta } = Card;

const ClassDirectJoining = () => {
  const [loading, setLoading] = useState(false);
  const [loadingJoin, setLoadingJoin] = useState(false);
  const [classroom, setClassroom] = useState({});
  const { id } = useParams();
  const { search } = useLocation();
  const code = new URLSearchParams(search).get("cjc");
  const history = useHistory();
  const userInfo = JSON.parse(localStorage.getItem("user"));
  if (!userInfo) {
    history.push("/sign-in");
  }

  useEffect(() => {
    classroomApi
      .checkUserJoinClass(id)
      .then((res) => {
        if (res.data.joined) {
          history.push(`/classroom/${id}`);
        }
      })
      .then((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      classroomApi
        .getClassroomByInvitationCode(id, code)
        .then((res) => {
          const data = res.data;
          setClassroom(data);
        })
        .catch((err) => {
          console.log(err);
          history.push("/sign-in");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleJoinClass = async () => {
    setLoadingJoin(true);
    try {
      await classroomApi.joinClassByInvitationCode(id, code);
      history.push(`/classroom/${id}`);
    } catch (error) {
      console.log(error);
      history.push(`/classroom`);
    } finally {
      setLoadingJoin(false);
    }
  };

  return (
    <div className="w-full py-8 flex justify-center">
      <Card
        loading={loading}
        className="w-[80%] h-full"
        title={
          <div className="m-8 flex flex-col justify-center items-center gap-3">
            <img
              src={logo}
              alt="Logo"
              style={{ width: "100px", height: "100px" }}
            />
            <h2>ELearning</h2>
            <p className="text-center font-normal whitespace-normal">
              Platform helps classromms to communicate, share materials, save
              time and keep organized.
            </p>
          </div>
        }
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            title={
              <div className="flex flex-col justify-center items-center gap-6">
                <div className="px-4 pt-2 flex items-center border rounded-[3px] border-gray-300 space-x-4">
                  <img
                    src={
                      userInfo?.profilePic
                        ? userInfo?.profilePic
                        : "https://i.pravatar.cc/150?img=56"
                    }
                    alt="avatar"
                    className="rounded-full w-[40px]"
                  />
                  <div className="font-normal flex flex-1 flex-col justify-center gap-2">
                    <div>{userInfo?.username}</div>
                    <p>{userInfo?.email}</p>
                  </div>
                </div>
                <span>
                  You are joining the class "{classroom.name}" as role of
                  student
                </span>
                <Button
                  type="primary"
                  loading={loadingJoin}
                  onClick={() => handleJoinClass()}
                >
                  Join class
                </Button>
              </div>
            }
            description={
              <p className="text-center mt-4">
                Joining the class means that you agree to share your contact
                information with your class participants.
              </p>
            }
          />
        </Skeleton>
      </Card>
    </div>
  );
};

export default ClassDirectJoining;
