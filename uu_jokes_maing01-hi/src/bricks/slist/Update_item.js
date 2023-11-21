
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import {useState} from "uu5g05";
function AddBook(props){
  const[name, setName] = useState();
  const[amount, setAmount] = useState();
  const[unit, setUnit] = useState();


  return (
    <Uu5Elements.ListItem actionList={[{icon:"uugds-plus", onClick: ()=> name && author && props.onAdd({name,author})}]}>
      <Uu5Forms.Text.Input value = {name} onChange={(e)=> setAmount(e.data.value)} placeholder="Name" significance="distinct"/>
      <Uu5Forms.Text.Input value = {author} onChange={(e)=> setUnit(e.data.value)} placeholder="Author" significance="subdued"/>
    </Uu5Elements.ListItem>
  )
}

export default AddBook;

