import React, {useEffect, useState} from "react";
import "../App.css";
import {useDispatch, useSelector} from "react-redux";
import {modalsToggle, userAdd} from "../features/ModalSlice";
import { useAddUsersMutation, useEditUsersMutation } from "../features/UsersApi";
const UsersModal = () => {
  const dispatch = useDispatch();
  const {user, type} = useSelector((state) => state.modal);
  const [input, setInput] = useState({
    id: null,
    name: "",
    email: "",
  });
  const [
    addUser,
    {error: addError, isError: addIsError, isLoading: addIsLoading},
  ] = useAddUsersMutation();
  const [
    editUser,
    {error: editError, isError: editIsError, isLoading: editIsLoading},
  ] = useEditUsersMutation();

  useEffect(() => {
    setInput({
      id: user?.id || null,
      name: user?.name || "",
      email: user?.email || "",
    });
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(type === "edit") {
      editUser(input)
    }else if (type === "add") {
      addUser(input)
    }

    dispatch(modalsToggle())
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="user-modal">
      <form onSubmit={handleSubmit} className="user-form">
        <input
          onChange={handleChange}
          value={input.name}
          name="name"
          placeholder="name: "
          className="user-form-input"
          type="text"
        />
        <input
          onChange={handleChange}
          value={input.email}
          name="email"
          placeholder="email: "
          className="user-form-input"
          type="email"
        />
        <div className="user-form-bottom">
          <button
            className="user-form-button"
            type="button"
            onClick={() => {
              dispatch(modalsToggle());
            }}
          >
            cancel
          </button>
          <button className="user-form-button" type="submit">
            admit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UsersModal;
