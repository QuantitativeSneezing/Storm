import { useHistory } from "react-router-dom"

function CartIntermediary (){
const history= useHistory()
function libraryRedirect(){
    history.push('/library')
}
function storeRedirect(){
    history.push('/')
}
    return (
        <div className="cart-done-container">
            <div style={{"margin-left": "18%", "margin-bottom" : "15px"}}>Thanks for your purchase!</div>
            <div onClick={libraryRedirect} className="cart-button-checkout"> Go to your library</div>
            <div onClick={storeRedirect} className="cart-button-checkout"> Continue shopping</div>
        </div>
    )
}
export default CartIntermediary
