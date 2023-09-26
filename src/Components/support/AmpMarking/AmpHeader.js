import React,{Component} from 'react';
class AmpHeader extends Component{
constructor(props){
super(props)

}
render(){
    return(
        <>
         <ol class="breadcrumb dashbread mb-0">
                    <li class="breadcrumb-item active"><a href="/support">Support</a></li>
                    <li class="breadcrumb-item">AmpMarking</li>
                    <li class="breadcrumb-menu ml-auto">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Search"/>
                            <div class="input-group-append">
                                <span class="input-group-text"><i class="fa fa-search"></i></span>
                            </div>
                        </div>
                    </li>
                </ol>
        </>
    )
}
}
export default AmpHeader