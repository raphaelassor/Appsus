const { NavLink } = ReactRouterDOM
import {IconEmail} from '.././apps/Keep/cmps/icon-cmps/IconEmail.jsx'
import { IconBook } from '../apps/Books/cmps/IconBook.jsx'
import { IconText } from '../apps/Keep/cmps/icon-cmps/IconText.jsx'
import { IconHome } from './IconHome.jsx'
export class NavApps extends React.Component {
    state={
        isShown:false
    }

toggleNav=()=>{
    this.setState({isShown:!this.state.isShown})
}
closeNav=()=>{
    this.setState({isShown:false})
}

    render(){
        const {isShown}=this.state
        return <div className={"nav-apps-container"}>
            <div className="nav-apps-icon-container">
            <svg onClick={this.toggleNav} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="th" class="icon-apps" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M149.333 56v80c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V56c0-13.255 10.745-24 24-24h101.333c13.255 0 24 10.745 24 24zm181.334 240v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm32-240v80c0 13.255 10.745 24 24 24H488c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24zm-32 80V56c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm-205.334 56H24c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24zM0 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zm386.667-56H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zm0 160H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zM181.333 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24z"></path></svg>
            </div>
          {isShown&&
           <ul className="clean-list apps-list">
           <li> <NavLink onClick={this.toggleNav} to="/">
               <IconHome/>
               <span>Home</span>
               </NavLink></li>
        <li><NavLink onClick={this.toggleNav} to="/email"> 
        <IconEmail/>
        <span>Mail</span>
         </NavLink></li>
        <li> <NavLink onClick={this.toggleNav} to="/keep">
            <IconText/>
            <span>Keep</span>
            </NavLink></li>
        <li> <NavLink onClick={this.toggleNav} to="/book">
            <IconBook/>
            <span>Books</span>
            </NavLink></li>
            </ul>
          }
         <label class="icon-apps" htmlFor="icon-apps">
        <input type="checkbox" />
    </label>
          </div>
        
    }
}