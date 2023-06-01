import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./form.css";

const Form = () => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const nombreInput = document.querySelector('input[name="nombre"]');
    const nombre = nombreInput.value.trim();

    // Expresión regular para validar que solo se ingresen letras y espacios en blanco
    const regex = /^[a-zA-Z\s]+$/;

    if (nombre === "") {
      toast.error("¡Ingresa un nombre!");
    } else if (!regex.test(nombre)) {
      toast.error("¡El nombre solo puede contener letras y espacios!");
    } else {
      toast.success("¡Envío exitoso!");

      const nombre = nombreInput.value;
      const pais = document.querySelector('select[name="pais"]').value;

      axios
        .post("http://localhost:3000/formulario", { nombre, pais }) // quiza deba cambiar la direcion cuando lo conecte con azure
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3/all");
        const countryNames = response.data.map(
          (country) => country.name.common
        );

        const sortedCountries = countryNames.sort((a, b) => a.localeCompare(b));
        setCountries(sortedCountries);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="c-form__title">Formulario</h1>
        <form className="c-form" onSubmit={handleSubmit}>
          <label className="c-form__label">
            Nombre completo:
            <input
              type="text"
              name="nombre"
              placeholder="Escribe tu nombre"
              className="c-form__input"
            />
          </label>
          <br />
          <br />
          <label className="c-form__label">
            País:
            <select name="pais" className="c-form__input">
              <option value="">Seleccione un país</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </label>
          <br />
          <button type="submit" className="c-form__submit-btn">
            Enviar
          </button>
          <ToastContainer />
        </form>
      </div>
    </>
  );
};

export default Form;
