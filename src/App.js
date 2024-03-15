import './App.css';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';

function App() {

  const nav = useNavigate();
  const [loger, setLoger] = useState({ fname: "", age: "", pass: "" });
  const [edit, setEdit] = useState(-1)
  const [searchName, setSearchName] = useState("")
  const [data11, setData11] = useState(JSON.parse(localStorage.getItem("parth")) || [])
  const [selectedIndices, setSelectedIndices] = useState([]);
  const handelChange = (e) => {
    setLoger({ ...loger, [e.target.name]: e.target.value });

  }
  const handelSubmit = (e) => {
    if (edit !== -1) {
      const update = data11.map((item, index) => {
        if (edit === index) {
          return loger
        }
        else {
          return item
        }
      })
      setData11(update)
    }
    else {

      setData11([...data11, loger])
      localStorage.setItem("parth", JSON.stringify([...data11, loger]));
    }

  }
  const dataDelet = (idx) => {
    const drecord = data11.filter((item, index) => { return idx !== index })
    setData11(drecord)
    localStorage.setItem('parth', JSON.stringify(drecord))
  }
  const dataEdit = (idx) => {
    setEdit(idx)
    const editrecord = data11.find((item, index) => { return index === idx })
    setLoger(editrecord)
  }
  const handleCheckboxChange = (index) => {
    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter((i) => i !== index));
    } else {
      setSelectedIndices([...selectedIndices, index]);
    }
  };
  const sDelete = () => {
    const updatedData = data11.filter((item, index) => !selectedIndices.includes(index));
    setData11(updatedData);
    localStorage.setItem("parth", JSON.stringify(updatedData));
    setSelectedIndices([]);
  };
  // const handleSearch = (e) => {

  //   console.log(typeof searchName);
  //   const filterrecords = data11.filter(record => record.fname.toLowerCase().includes(searchName.toLowerCase()))
  //   setData11(filterrecords)



  // }

  // function sortTable() {
  //   const select = document.getElementById("sortSelect");
  //   const value = select.options[select.selectedIndex].value;
  //   console.log(value);
  //   const sorted1 = data11.sort((a, b) => {
  //     if (value === 'fname') {
  //       return a.fname.localeCompare(b.fname);
  //     } else if (value === 'age') {
  //       return (parseInt(a.age) - parseInt(b.age));
  //     }
  //   });
  //   console.log(sorted1);
  //   setData11([...sorted1]);
  // }
  const [sort, setSort] = useState("")
  const sortresult = useMemo(() => {
    if (sort === "First name") {
      return (
        data11.sort((a, b) =>
          (a.fname.localeCompare(b.fname))
        )

      )
    }
    if (sort === "Age")
      return (
        data11.sort((a, b) =>
          a.age - (b.age))
      )


  }, [sort])

  const searchresult = useMemo(() => {
    if (searchName) {
      return (data11.filter((item) => { return item.fname.toLocaleLowerCase().includes(searchName.toLocaleLowerCase()) || item.age.toLocaleLowerCase().includes(searchName.toLocaleLowerCase()) }))
    }

    return data11


  }, [searchName, data11])



  return (
    <>
      <div className='text-center bg-yellow-300 flex justify-center'>
        <div className='bg-green-400 px-12 py-5 my-5 border-2 border-black'>
          <h1 >login page</h1>
          <br />
          <input type='text' id='fname' name='fname' placeholder="First Name" value={loger.fname} onChange={(e) => handelChange(e)} /><br />
          <br />
          <br />
          <input type='number' id='age' name='age' placeholder="Age" value={loger.age} onChange={(e) => handelChange(e)} /><br />
          <br />
          <input type='password' id='pass' name='pass' placeholder='password' value={loger.pass} onChange={(e) => handelChange(e)} />
          <br /><br />
          <button type='submit' className='bg-red-400 px-9 py-3' onClick={() => handelSubmit()}>submit</button>
          <br /><br />
          <button type='button' className='btn bg-yellow-600 btn-primary' onClick={() => nav("/homepage")} >Login with Google</button>

        </div>

      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "5%" }} >
        <div>
          <input type='search' className='border-2 border-black' placeholder="Search" id='search' value={searchName} onChange={(e) => setSearchName(e.target.value)} />
          <button type='button' className='bg-green-400 p-1 rounded'>Search</button>
          <button type='button' className='bg-yellow-400 p-1 rounded' onClick={(e) => sDelete(e)} >delet selected</button>
          <br />
          <br />
          <table class="bordered">

            <thead >
              <th><button onClick={(e) => setSort(e.target.innerText)}>First name</button></th>
              <th><button onClick={(e) => setSort(e.target.innerText)}>Age</button></th>
              <th>password</th>
              <th>
                <select id="sortSelect">
                  <option >select</option>
                  <option value="age">Age</option>
                  <option value="fname">Name</option>
                  {/* <option  value="x">Surname</option>
                        <option  value="c">Age</option> */}
                </select>
              </th>
              <th>
                {/* <button type='button' className='bg-red-500 p-2 rounded' onClick={() => sortTable()}>Sort</button> */}
              </th>
            </thead>
            <tbody>

              {searchresult?.map((item, index) => {
                return (
                  <tr>
                    <td>{item.fname}</td>
                    <td>{item.age}</td>
                    <td>{item.pass}</td>
                    <td><button className='bg-red-400 px-9 py-3' onClick={() => dataDelet(index)}>delete</button></td>
                    <td><button className='bg-red-400 px-9 py-3' onClick={() => dataEdit(index)}>edit</button></td>
                    <td><input type='checkbox' id='check' checked={selectedIndices.includes(index)} onChange={() => handleCheckboxChange(index)} /></td>
                  </tr>
                )
              })}

            </tbody>
          </table>
        </div>
      </div></>
  );
}

export default App;
