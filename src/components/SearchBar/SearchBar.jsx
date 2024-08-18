import { toast, Toaster } from 'react-hot-toast';
import { Field, Form, Formik } from 'formik';
import css from './SearchBar.module.css';
import { FaSearch } from "react-icons/fa";


const SearchBar = ({ onSearch })=> {
  return (
    <header className={css.search_bar}>
      <Formik
        initialValues={{ query: '' }}
        onSubmit={(values, actions) => {
          if (values.query.trim() === '') {
            toast.error('Please enter the name of the movie!');
            return;
          }
          onSearch(values.query);
          actions.resetForm();
        }}
      >
        <Form className={css.search_form}>
          <Field
            className={css.search_field}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
          ></Field>
          <button className={css.search_button} type="submit">
          <FaSearch size="28" className={css.search_icon}/>&nbsp;Search
          </button>
          <Toaster position="top-right"/>
        </Form>
      </Formik>
    </header>
  );
}

export default SearchBar;