import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";
import { ContactsCrudContextProvider } from "../context/ContactsCrudContext";

/*
This is the entry point of the app. This class defines the routes - which is the mapping between the path 
and the component that handles it
*/
function App() {
  return (
    <div className="ui container">
      <Router> {/* This is the composition of the routes*/}
        <Header />  {/* This is the header component*/}
        <ContactsCrudContextProvider> {/* This is the context - which is more of a common pool that contains the variables, functions used by different components*/}
          <Routes> 
            <Route 
              path="/" // if the path is '/'
              exact // and has an exact match
              element={<ContactList />} // route to the element. The element is the handler of the request
            />
            <Route
              path="/add"
              element={<AddContact />}
            />

            <Route
              path="/edit"
              element={<EditContact />}
            />

            <Route path="/contact/:id" element={<ContactDetail />} />
          </Routes>
        </ContactsCrudContextProvider>
      </Router>
    </div>
  );
}

export default App;
