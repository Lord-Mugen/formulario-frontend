import { useEffect, useState } from "react";
import "./form.css";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const [nombreValue, setNombreValue] = useState("");
  const [paisValue, setPaisValue] = useState("");
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
        toast.error("Error al obtener la lista de países");
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const regex = /^[a-zA-Z\s]+$/;

    if (nombreValue === "") {
      toast.error("¡Ingresa un nombre!");
    } else if (!regex.test(nombreValue)) {
      toast.error("¡El nombre solo puede contener letras y espacios!");
    } else {
      toast.success("¡Envío exitoso!");

      const nombre = nombreValue;
      const pais = paisValue;

      axios
        .post("http://localhost:3000/formulario", { nombre, pais })
        .then((response) => {
          console.log(response.data);
          setNombreValue("");
          setPaisValue("");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error al enviar el formulario");
        });
    }
  };

  return (
    <>
      <main className="container">
        <h1 className="c-form__title">Formulario</h1>
        <form className="c-form" onSubmit={handleSubmit}>
          <label className="c-form__label">
            Nombre completo:
            <input
              type="text"
              name="nombre"
              placeholder="Escribe tu nombre"
              className="c-form__input"
              value={nombreValue}
              onChange={({ target: { value } }) => setNombreValue(value)}
            />
          </label>
          <br />
          <br />
          <label className="c-form__label">
            País:
            <select
              name="pais"
              className="c-form__input"
              value={paisValue}
              onChange={({ target: { value } }) => setPaisValue(value)}
            >
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
      </main>
    </>
  );
};

export default Form;
