import React, { useEffect, useState } from "react"
import axios from "axios"

function Astronaute() {
    const [astronautes, setAstronautes] = useState([])
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [addForm, setAddForm] = useState(false)
    const [updateForm, setUpdateForm] = useState(false)
    const [newName, setNewName] = useState("")
    const [newAge, setNewAge] = useState("")
    const [newId, setNewId] = useState("")

    const handleAddForm = () => {
        setAddForm(!addForm)
        setUpdateForm(false)

    }

    const AstronauteForm = (name, age, setName, setAge, handleSubmit) => {
        return (
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>
                    Nom:
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    Age:
                    <input
                        type="text"
                        name="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </label>
                <input type="submit" value="Envoyer" />
            </form>
        )
    }

    const handleAdd = (e) => {
        e.preventDefault()
        const data = {
            name: name,
            age: age
        }
        axios
            .post("http://localhost:3000/astronautes", data)
            .then((res) => {
                console.log(res)
                setAstronautes([...astronautes, res.data])
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        const data = {
            name: newName,
            age: newAge
        }
        axios
            .put(`http://localhost:3000/astronautes/${newId}`, data)
            .then((res) => {
                console.log(res)
                setAstronautes(
                    astronautes.map((astronaute) => {
                        if (astronaute._id === newId) {
                            return res.data
                        } else {
                            return astronaute
                        }
                    }
                    )
                )
                
            })
            .catch((err) => {
                console.log(err)
            })
    }



    const deleteAstronaute = (e, id) => {
        e.preventDefault()
        axios
            .delete(`http://localhost:3000/astronautes/${id}`)
            .then((res) => {
                console.log(res)
                setAstronautes(
                    astronautes.filter((astronaute) => astronaute._id !== id)
                )
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleUpdateForm = (e, astronaute) => {
        e.preventDefault()
        setUpdateForm(!updateForm)
        setAddForm(false)
        setNewName(astronaute.name)
        setNewAge(astronaute.age)
        setNewId(astronaute._id)
    }

    useEffect(() => {
        axios
            .get("http://localhost:3000/astronautes")
            .then((res) => {
                console.log(res)
                setAstronautes(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <h1> Astronautes </h1>
            <ul>
                {astronautes.map((astronaute) => (
                    <li key={astronaute._id}>
                        {astronaute.name} - {astronaute.age} &nbsp; |{" "}
                        <a
                            href="/"
                            onClick={(e) => {
                                handleUpdateForm(e, astronaute)
                            }}
                        >
                            Modifier
                        </a>{" "}
                        |{" "}
                        <a
                            href="/"
                            onClick={(e) => {
                                deleteAstronaute(e, astronaute._id)
                            }}
                        >
                            Supprimer
                        </a>
                    </li>
                ))}
            </ul>

            <button onClick={handleAddForm}>Ajouter un astronaute</button>
            {addForm && (
                <>
                    {" "}
                    <div>
                        <h1> Ajouter un astronaute </h1>
                    </div>
                    {AstronauteForm(name, age, setName, setAge, handleAdd )}
                </>
            )}

            {updateForm && (
                <>
                    {" "}
                    <div>
                        <h1> Modifier un astronaute </h1>
                    </div>
                    {AstronauteForm(newName, newAge, setNewName, setNewAge, handleUpdate)}
                </>
            )}

        </div>
    )
}

export default Astronaute
