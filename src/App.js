import AddItem from "./AddItem";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import { useState , useEffect} from 'react';
import { SearchItem } from "./SearchItem";
import apiReqest from "./apiRequest";




function App() {
  const API_URL = 'http://localhost:3500/items';
    const [items, setItems] = useState([]);
    const [newItem , setNewItem] = useState('')
    const [search, setSearch] = useState('')
    const [fetchError, setFetchError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

  

    useEffect(() =>{
      const fetchItems = async () => {
        try{
          const response = await fetch(API_URL);
          if(!response.ok) throw Error("Data not received");
          const listItems = await response.json();
          setItems(listItems);
          setFetchError(null)
        } catch(err){
          setFetchError(err.message)
        } finally{
          setIsLoading(false)
        }
      }
      (async () => await fetchItems())()
    },[])

    const addItem = async (item) => {
      const id = items.length ? items[items.length - 1].id + 1 : 1;
      const addNewItem = {id, checked:false, item }
      const listItems = [...items, addNewItem]
      setItems(listItems)

      const postOptions = {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(addNewItem)
      }
      const result = await apiReqest(API_URL,postOptions)
      if(result) setFetchError(result)
/*       localStorage.setItem("todo_list",JSON.stringify(listItems)) */
    }

      const handelCheck = async(id) =>{
        const listItems = items.map((item) =>
        item.id === id ? {...item,Checked:!item.checked} : item)
        setItems(listItems)


        const myItem = listItems.filter((item) => item.id===id)
        const updateOptions = {
          method: 'PATCH',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({Checked:myItem[0].Checked})
        }
        const reqUrl = `${API_URL}/${id}`
        const result = await apiReqest(reqUrl,updateOptions)
        if(result) setFetchError(result)
        
  /*       localStorage.setItem("todo_list",JSON.stringify(listItems)) */
      }
      const handleDelete = async(id) =>{
        const listItems = items.filter((item) =>
        item.id!==id)
        setItems(listItems)
        
        const deleteOptions = {method: 'DELETE'}
        const reqUrl = `${API_URL}/${id}`
        const result = await apiReqest(reqUrl,deleteOptions)
        if(result) setFetchError(result)
        
  /*       localStorage.setItem("todo_list",JSON.stringify(listItems)) */
  
      }
      const handleSubmit = (e) => {
        e.preventDefault()
        if(!newItem) return;
        console.log(newItem)
        addItem(newItem)
        setNewItem('')
      }

  return(
    <div className="App">
      <Header title="To Do List"/>
      <AddItem
        newItem = {newItem} 
        setNewItem = {setNewItem}
        handleSubmit = {handleSubmit}
      />
      <SearchItem 
      search = {search}
      setSearch = {setSearch}
      />
      <main>
        {isLoading && <p>Loading Items..</p>}
        {fetchError && <p>{`Error : ${fetchError}`}</p>}
        {!isLoading && !fetchError && <Content
          items = {items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handelCheck = {handelCheck}
          handleDelete = {handleDelete}
          />}
        </main>
      <Footer 
       length = {items.length}
       />
    </div>
  );
}

export default App;



