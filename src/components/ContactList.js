import React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";
import ContactCard from "./ContactCard";

/* 
This is a function component. 
The components in the react framework are of two types - class component and 
function component. Both are used for the same purpose - its just a choice of the coder to choose between the two
*/
const ContactList = (props) => {
  // This is array destructuring syntax. The items in the array returned by the useContactsCrud() function are assigned to the const on the left hand side
  const {contacts, retrieveContacts, searchHandler, text, searchResults} = useContactsCrud();

  // this is a hook. This runs imm after the page loads. If this useEffect has a return method, that runs before the page unloads
  useEffect(() => {
    retrieveContacts();
  }, []);


  const renderContactList = (text.length < 1 ? contacts : searchResults).map((contact) => {
    return (
      <ContactCard
        contact={contact}
        key={contact.id}
      />
    );
  });

  const onUserSearch = (e) => {
    searchHandler(e.target.value);
  }

  return (
    <div className="main">
      <h2> 
        Contact List
        <Link to="/add"> {/* This is used to route the control to the add component */}
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input 
            type="text"
            placeholder="Search Contacts" 
            className="prompt"
            value={text}
            onChange={(e) => onUserSearch(e)}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">
        {renderContactList.length > 0
          ? renderContactList
          : "No Contacts available"}
      </div>
    </div>
  );
};

export default ContactList;
