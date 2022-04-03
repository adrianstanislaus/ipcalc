import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const defaultMatkul = [{ matkul: "Antena", indeks: 3.5, sks: 3 }];
  const [dataMatkul, setDataMatkul] = useState(defaultMatkul);
  const [totalSks, setTotalSks] = useState(0);
  const [totalNilai, setTotalNilai] = useState(0);
  const [ipk, setIpk] = useState(0);

  const onChange = (index) => (e) => {
    console.log(e);
    let newArr = [...dataMatkul]; // copying the old datas array
    newArr[index][e.target.name] = e.target.value; // replace e.target.value with whatever you want to change it to
    setDataMatkul(newArr);
  };

  const add = () => {
    let newArr = [...dataMatkul]; // copying the old datas array
    newArr.push({ matkul: "", indeks: 4, sks: 3 }); // adding a new item to the array
    setDataMatkul(newArr);
  };

  const remove = (index) => {
    let newArr = [...dataMatkul];
    newArr = newArr.filter((item, urut) => urut !== index);
    setDataMatkul(newArr);
  };

  useEffect(() => {
    console.log("dataMatkul", dataMatkul);
    setTotalNilai(dataMatkul.reduce((a, v) => (a = a + v.indeks * v.sks), 0));
    setTotalSks(dataMatkul.reduce((a, v) => (a = a + parseFloat(v.sks)), 0));
  }, [dataMatkul]);

  useEffect(() => {
    console.log("totalNilai", totalNilai);
    console.log("totalSks", totalSks);
    console.log("IPK", (totalNilai / totalSks).toFixed(2));
    setIpk((totalNilai / totalSks).toFixed(2));
  }, [totalNilai, totalSks]);

  return (
    <div className="App">
      <table>
        <tr>
          <td>Matkul</td>
          {dataMatkul.map((item, index) => (
            <td key={index}>
              <input
                name="matkul"
                type="text"
                value={item.matkul}
                onChange={onChange(index)}
              />
              <button onClick={(e) => remove(index)}>Delete</button>
            </td>
          ))}
          <td>
            <button onClick={add}>Add</button>
          </td>
        </tr>
        <tr>
          <td>Indeks</td>
          {dataMatkul.map((item, index) => (
            <td key={index}>
              <select
                aria-label="Select Indeks"
                name="indeks"
                value={item.indeks}
                onChange={onChange(index)}
              >
                <option value={4}>A</option>
                <option value={3.5}>AB</option>
                <option value={3}>B</option>
                <option value={2.5}>BC</option>
                <option value={2}>C</option>
                <option value={1}>D</option>
                <option value={0}>E</option>
              </select>
            </td>
          ))}
        </tr>
        <tr>
          <td>SKS</td>
          {dataMatkul.map((item, index) => (
            <td key={index}>
              {" "}
              <input
                type="number"
                name="sks"
                value={item.sks}
                onChange={onChange(index)}
              />
            </td>
          ))}
        </tr>
        <tr>
          <td>Nilai x SKS</td>
          {dataMatkul.map((item, index) => (
            <td key={index}>{item.indeks * item.sks}</td>
          ))}
        </tr>
        <tr>
          <td>Total Nilai</td>
          <td>{totalNilai}</td>
        </tr>
      </table>
      <div>
        IPK = <div>{ipk}</div>{" "}
      </div>
    </div>
  );
}

export default App;
