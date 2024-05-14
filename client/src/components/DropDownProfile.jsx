import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useSnackbar } from "notistack";

const DropDownProfile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { logoutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logoutUser();
    enqueueSnackbar("Logout successfully", { variant: "success" });
  };
  return (
    <div className="flex flex-col dropdownProfile">
      <ul className="flex flex-col gap-4">
        <li className="dropdown-item">
          <a href="/order">Order</a>
        </li>
        <li className="dropdown-item dropdown-item-active">
          <a href="" onClick={handleLogout}>
            Log out
          </a>
        </li>
      </ul>
    </div>
  );
};

export default DropDownProfile;
