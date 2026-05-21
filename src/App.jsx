import React from "react";
import {useAddUsersMutation, useDeleteUsersMutation, useEditUsersMutation, useGetUsersQuery} from "./features/UsersApi";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import UsersModal from "./components/UsersModal";
import { clearUser, modalsToggle, typeChange, userAdd } from "./features/ModalSlice";
const App = () => {
  const {data, isError, isLoading, error} = useGetUsersQuery();
  const [addUser, {error: addError, isError: addIsError, isLoading: addIsLoading}] = useAddUsersMutation();
  const [editUser, {error: editError, isError: editIsError, isLoading: editIsLoading}] = useEditUsersMutation();
  const [deleteUser, {error: deleteError, isError: deleteIsError, isLoading: deleteIsLoading}] = useDeleteUsersMutation();
  const errorMessage = error?.message || addError?.message || editError?.message || deleteError?.message || "error acquired, go to console!";
  const appIsError = isError || addIsError || editIsError || deleteIsError;  
  {
    appIsError ? console.error(errorMessage) : null
  }

  const loading = isLoading || addIsLoading || editIsError || deleteIsLoading
  const  modal = useSelector(state => state.modal)
  const dispatch = useDispatch()  
  return (
    <div className="container">
      <div className="container-box">
        {
          loading ? <h2 className="container-loading">Loading...</h2>: null
        }
        
        {
          appIsError ? <p className="container-error">{errorMessage}</p> : null
        }
        
      </div>
      <div className="container-users">
        <button className="user-buttons" onClick={() => {
          dispatch(modalsToggle())
          dispatch(clearUser())
          dispatch(typeChange("add"))
        }}>add user</button>
        {data?.map(({id, name, email}) => (
          <div key={`${id} ${email}`} className="user">
            <div className="user-top">
              <h2 className="user-name">{name}</h2>
              <p className="user-email">{email}</p>
            </div>
            <div className="user-bottom">
              <button className="user-buttons" onClick={() => {
                dispatch(userAdd({
                  id, name, email
                }))
                dispatch(modalsToggle())
                dispatch(typeChange("edit"))
              }}>edit</button>
              <button onClick={() => {
                const idUser = Number(id) || id;
                deleteUser(idUser)
              }} className="user-buttons">delete</button>
            </div>
          </div>
        ))}
      </div>
      {
        modal.modals ? <UsersModal/> : null
      }
    </div>
  );
};

export default App;
