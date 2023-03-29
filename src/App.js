import React from "react";
import { Context } from "./Context";

function App() {
  const { finalList, input, HandleChange, Add, Clear, Edit, Delete } =
    React.useContext(Context);

  const inputFields = ["Name", "ProductUrl", "Image", "Tag"];

  return (
    <>
      <h1>CRUD OPERATION USING REACT</h1>
      <table>
        <tbody>
          <tr>
            {inputFields.map((value, index) => {
              return <th key={index}>{value}</th>;
            })}
          </tr>

          <tr>
            <td>
              <input name="name" value={input.name} onChange={HandleChange} />
            </td>
            <td>
              <input name="url" value={input.url} onChange={HandleChange} />
            </td>
            <td>
              <input name="img" value={input.img} onChange={HandleChange} />
            </td>
            <td>
              <input name="tag" value={input.tag} onChange={HandleChange} />
            </td>
            <td>
              <button onClick={Add}>ADD</button>
            </td>
            <td>
              <button onClick={Clear}>Clear</button>
            </td>
          </tr>

          {finalList.map((row, index) => {
            return (
              <tr key={index}>
                <td>{row.name}</td>
                <td>
                  <a href={row.url}>{row.url}</a>
                </td>
                <td>
                  <img src={row.img} alt="image" height={100} width={100} />
                </td>
                <td>{row.tag}</td>
                <td>
                  <button value={index} onClick={Edit}>
                    EDIT
                  </button>
                </td>
                <td>
                  <button value={index} onClick={Delete}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
