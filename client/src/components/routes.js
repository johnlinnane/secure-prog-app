import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AuthContainer from './auth_container';
import Page1 from './page_1.js';
import Page2 from './page_2.js';












const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Page1}/>
            {/* <Route path="/" exact component={AuthContainer(Page1, null)}/> */}
            {/* <Route path="/page2" exact component={AuthContainer(Page2, null)}/> */}
            <Route path="/page2" exact component={Page2}/>
            
        </Switch>



        // <Layout>
            // <Switch>
                
            //     <Route path="/" exact component={AuthContainer(Intro, null)}/>
            //     <Route path="/categories" exact component={AuthContainer(CatList, null)}/>
            //     <Route path="/category/:id" exact component={AuthContainer(CatView, null)}/>
            //     <Route path="/subcategory/:id" exact component={AuthContainer(SubcatView, null)}/>
            //     <Route path="/items/:id" exact component={AuthContainer(ItemView, null)}/>
            //     <Route path="/search" exact component={AuthContainer(Search, null)}/>
            //     <Route path="/map" exact component={AuthContainer(MainMap, null)}/>
            //     <Route path="/info" exact component={AuthContainer(Info, null)}/>
            //     <Route path="/add_item" exact component={AuthContainer(AddItem, null)}/>
            //     <Route path="/login" exact component={AuthContainer(Login, false)}/> {/* DOESN'T SHOW IF USER IS LOGGED IN */}

            //     {/* WHEN LOGGED IN */}

            //     <Route path="/user/logout" exact component={AuthContainer(Logout, true)}/>
            //     <Route path="/user" exact component={AuthContainer(User, true)}/>
            //     <Route path="/user/user_items" exact component={AuthContainer(UserItems, true)}/>
            //     <Route path="/user/all-items" exact component={AuthContainer(AllItems, true)}/>
            //     <Route path="/user/pending-items" exact component={AuthContainer(PendingItemsView, true)}/>

            //     <Route path="/user/edit-item/:id" exact component={AuthContainer(EditItem, true)}/>
            //     <Route path="/user/edit-item-sel/:id" exact component={AuthContainer(EditItemSel, null)}/>
            //     <Route path="/user/edit-item-file/:id" exact component={AuthContainer(EditItemFile, null)}/>
            //     <Route path="/user/chapter-index/:id" exact component={AuthContainer(ChapterIndex, true)}/>

            //     <Route path="/admin/:tab" exact component={AuthContainer(Admin, true)}/>
            //     <Route path="/cat-edit/:id" exact component={AuthContainer(CatEdit, true)}/> {/*STILL USED??*/}

            //     {/* DEPRECATED & MISC */}
                
            //     <Route path="/user/register" exact component={AuthContainer(Register, true)}/> 
            //     <Route path="/home" exact component={AuthContainer(Home, null)}/>
            //     <Route path="/sandbox" exact component={AuthContainer(Sandbox, false)}/>  {/* true */}
                
            // </Switch>
        // </Layout>
        
    );
};

export default Routes;