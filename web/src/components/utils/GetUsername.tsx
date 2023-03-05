import axios from "axios";
import { Spinner } from "phosphor-react";
import { useEffect, useState } from "react";

interface usersFromDB {
  id: string;
  firstName: string;
  lastName: string;
}

interface joinedStringObject {
  [key: string]: string;
}

const GetUsername = (objectJoinedIds: joinedStringObject) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<usersFromDB[]>([]);

  const arrayOfJoinedIds = Object.entries(objectJoinedIds).map(
    ([key, value]) => {
      return { key, value };
    }
  );

  const getUsername = async () => {
    try {
      const allUserPromise = arrayOfJoinedIds.map(async (user) => {
        const response = await axios(
          `http://localhost:3333/user-name/${user.value}`
        );
        return response.data;
      });

      const allUsers = await Promise.all(allUserPromise);
      setUser(allUsers);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsername();
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        user.map((user) => {
          return (
            <div key={user.id}>
              <div>
                {user.firstName} {user.lastName}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default GetUsername;
