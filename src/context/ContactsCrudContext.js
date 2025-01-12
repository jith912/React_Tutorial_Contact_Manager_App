import { createContext, useContext, useState } from "react";
import api from "../api/contacts";
import { v4 } from "uuid";

const contactsCrudContext = createContext();

export function ContactsCrudContextProvider({children}) {
    const [contacts, setContacts] = useState([]); // This is used only in functional components. 
    const [contact, setContact] = useState([]);
    const [text, setText] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    //RetrieveContacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    if (response.data) {
      setContacts(response.data);
    } 
  };

  const addContactHandler = async (contact) => {
    const request = {
      id: v4(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const searchHandler = (searchTerm) => {
    setText(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        console.log(contact);
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    }else {
      setSearchResults(contacts);
    }
  };

  const value = {
    contact,
    contacts,
    retrieveContacts,
    addContactHandler,
    removeContactHandler,
    updateContactHandler,
    searchHandler,
    text,
    searchResults
  }

    return (
        <contactsCrudContext.Provider value={ value }>
            {children}
        </contactsCrudContext.Provider>
    )
}


export function useContactsCrud() {
  //This useContext function is defined in the react framework. When given a context, it returns the currrent context value 
    return useContext(contactsCrudContext)
}