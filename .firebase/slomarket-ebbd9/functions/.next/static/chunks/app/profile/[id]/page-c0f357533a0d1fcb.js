(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[495],{97440:function(e,t,n){Promise.resolve().then(n.bind(n,54664))},35959:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return AuthProvider},useAuth:function(){return useAuth}});var i=n(57437),r=n(2265),s=n(70148),a=n(53085);let l=(0,r.createContext)();function useAuth(){return(0,r.useContext)(l)}function AuthProvider(e){let{children:t}=e,[n,o]=(0,r.useState)(),[c,d]=(0,r.useState)(!0);async function isAdmin(){return await s.I8.currentUser.getIdTokenResult().then(e=>!!e.claims.admin).catch(e=>{throw e})}return(0,r.useEffect)(()=>{let e=s.I8.onAuthStateChanged(e=>{o(e),d(!1)},e=>{console.error("Authentication error:",e),d(!1)});return e},[]),(0,i.jsx)(l.Provider,{value:{currentUser:n,getUser:function(){return s.I8.currentUser},isLoggedIn:function(){return null!==s.I8.currentUser},isAdmin,login:function(e,t){return s.I8.signInWithEmailAndPassword(e,t)},signOut:function(){return s.I8.signOut()},signUp:function(e,t){return(0,a.Xb)(s.I8,e,t)}},children:!c&&t})}},54664:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return Profile}});var i=n(57437),r=n(2265),s=n(43226),a=n(96507),l=n(67070),o=n(6882),c=n(28874),d=n(3283),h=n(78276),u=n(13457),g=n(52653),x=n(33932),p=n(61417),m=n(54986),j=n(12782),f=n(92277),Z=n(24033),b=n(35959);n(53085);var v=n(94145),y=n(49599),S=n(4510),w=n(46446),I=n(80499),C=n(72467),P=n(4856),A=n(14565),U=n(22492),k=n(64165),L=n(24086),D=n(70148);function MyListings(e){let{user:t}=e,[n,l]=(0,r.useState)([]),[o,d]=(0,r.useState)(1);return(0,r.useEffect)(()=>{let fetchListings=async()=>{let e=(0,L.IO)((0,L.hJ)(D.db,"listings"),(0,L.ar)("sellerId","==",t.uid),(0,L.Xo)("createdAt","desc")),n=await (0,L.PL)(e),i=[];n.forEach(e=>{i.push({id:e.id,...e.data()})}),l(i)};fetchListings()},[]),(0,i.jsx)(a.Z,{px:3,py:2,children:0===n.length?(0,i.jsxs)(a.Z,{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",pb:10,children:[(0,i.jsx)("img",{src:"/_next/static/fonts/standing-19.svg",alt:"No Listings"}),(0,i.jsxs)(s.Z,{pt:5,variant:"h5",children:[(0,i.jsxs)("strong",{children:["No listings found by ",t.name]})," "]})]}):(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(c.ZP,{container:!0,spacing:2,children:n.slice((o-1)*10,10*o).map(e=>{let t=e.location.split(", "),n=t.length>2?"".concat(t[1],", ").concat(t[2]):e.location;return(0,i.jsx)(c.ZP,{item:!0,children:(0,i.jsx)(k.Z,{listingId:e.id,title:e.title,createdAt:e.createdAt,updatedAt:e.updatedAt,description:e.description,images:e.images,location:n,price:e.price,studentVerification:e.studentVerification,priceHistory:e.priceHistory})},e.id)})}),(0,i.jsx)(u.Z,{spacing:2,alignItems:"center",marginY:5,children:(0,i.jsx)(U.Z,{count:Math.ceil(n.length/10),page:o,onChange:(e,t)=>{d(t)}})})]})})}var E=n(29872),J=n(21975),N=n(40182),O=n(52280),R=n(49050),V=n(89394),T=n(91797),B=n(26337),F=n(42834),M=n(89554),H=n(22440);function Settings(e){var t,n;let{user:o,setUser:h,setCurrentTab:u}=e,[x,p]=(0,r.useState)({}),[m,j]=(0,r.useState)(),[f,b]=(0,r.useState)([]),[S,w]=(0,r.useState)([]),[I,C]=(0,r.useState)(!1),[P,A]=(0,r.useState)(!1),U=(0,Z.useRouter)(),[k,L]=(0,r.useState)(null),handleChange1=e=>{L(e.target.value)},[D,_]=(0,r.useState)(null),handleChange2=e=>{_(e.target.value)},[W,z]=(0,r.useState)(null),handleChange3=e=>{z(e.target.value)},Y=(0,r.useCallback)(e=>{let t=e[0],n=URL.createObjectURL(t);b([t,n]),C(!1)},[]),q=(0,r.useCallback)(e=>{let t=e[0],n=URL.createObjectURL(t);w([t,n]),A(!1)},[]),{getRootProps:Q,getInputProps:X}=(0,H.uI)({onDrop:Y,maxFiles:1,accept:{"image/*":[".jpeg",".jpg",".png"]}}),{getRootProps:$,getInputProps:K}=(0,H.uI)({onDrop:q,maxFiles:1,accept:{"image/*":[".jpeg",".jpg",".png"]}}),handleProfileImageDialogClose=()=>{C(!1)},handleHeroDialogClose=()=>{A(!1)};async function handleSaveSettings(e){e.preventDefault();let t=new FormData(e.currentTarget),n=o.uid,i=t.get("name"),r=t.get("location"),s=t.get("phoneNumber");if(s&&(!e.currentTarget.reportValidity()||!s.match(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)))return p({...x,phoneNumber:{error:!0,message:"Your phone number is not formatted correctly."}}),!1;let a={name:i,location:r,phoneNumber:s};if(0!=f.length)try{let e=await (0,v.Ix)(n,f[0]);a.profileImage=e}catch(e){return console.error(e),j(e.message),!1}if(0!=S.length)try{let e=await (0,v.Ix)(n,S[0]);a.heroImage=e}catch(e){return console.error(e),j(e.message),!1}await (0,v.Nq)(n,a).then(()=>{U.push("/profile/".concat(n))}).catch(e=>{console.error(e),j(e.message)});let l={...o,...a};return h(l),u(0),!1}return(0,i.jsxs)("div",{style:{width:"100%",textAlign:"left",height:"100vh"},children:[(0,i.jsxs)("form",{onSubmit:function(e){"saveSettings"==e.nativeEvent.submitter.name&&handleSaveSettings(e)},style:{padding:2,display:"flex",flexDirection:"column",alignItems:"center"},children:[m?(0,i.jsx)(l.Z,{severity:"error",children:m}):null,(0,i.jsxs)(c.ZP,{container:!0,spacing:2,columnSpacing:8,alignItems:"center",justifyContent:"center",mt:3,children:[(0,i.jsxs)(c.ZP,{item:!0,children:[(0,i.jsx)(s.Z,{align:"center",children:"Profile Picture"}),(0,i.jsx)(g.Z,{onClick:()=>{C(!0)},children:(0,i.jsx)(E.Z,{elevation:3,sx:{width:100,height:100,backgroundImage:"url(".concat(f[1],")"),backgroundSize:"cover",backgroundPosition:"center",position:"relative",borderRadius:"50%"},children:!f[1]&&(0,i.jsx)(d.Z,{alt:"Banner",sx:{width:100,height:100},variant:"circular",children:(0,i.jsx)(y.Z,{})})})})]}),(0,i.jsxs)(c.ZP,{item:!0,children:[(0,i.jsx)(s.Z,{align:"center",children:"Banner Image"}),(0,i.jsx)(g.Z,{onClick:()=>{A(!0)},sx:{borderRadius:0},children:(0,i.jsx)(E.Z,{elevation:3,sx:{width:200,height:100,backgroundImage:"url(".concat(S[1],")"),backgroundSize:"cover",backgroundPosition:"center",position:"relative"},children:!S[1]&&(0,i.jsx)(d.Z,{alt:"Banner",sx:{width:200,height:100},variant:"square",children:(0,i.jsx)(M.Z,{})})})})]})]}),(0,i.jsx)("br",{}),(0,i.jsxs)("div",{style:{width:"30%"},children:[(0,i.jsx)(J.Z,{margin:"dense",variant:"standard",id:"fname",name:"name",label:"Name",defaultValue:o.name,type:"text",required:!0,fullWidth:!0,inputProps:{maxLength:64}}),(0,i.jsx)("br",{}),(0,i.jsx)(a.Z,{sx:{ml:2},children:(0,i.jsx)(N.Z,{control:(0,i.jsx)(O.Z,{checked:"option1"===k,onChange:handleChange1,value:"option1"}),label:"Show Email to Registered Users"})}),(0,i.jsx)(a.Z,{sx:{ml:2},children:(0,i.jsx)(N.Z,{control:(0,i.jsx)(O.Z,{checked:"option2"===k,onChange:handleChange1,value:"option2"}),label:"Verified Students Only"})}),(0,i.jsx)("br",{}),(0,i.jsx)(J.Z,{margin:"dense",variant:"standard",id:"location",name:"location",label:"Location",type:"text",defaultValue:o.location,fullWidth:!0,inputProps:{maxLength:64}}),(0,i.jsx)("br",{}),(0,i.jsx)(a.Z,{sx:{ml:2},children:(0,i.jsx)(N.Z,{control:(0,i.jsx)(O.Z,{checked:"option1"===D,onChange:handleChange2,value:"option1"}),label:"Show Location to Registered Users"})}),(0,i.jsx)(a.Z,{sx:{ml:2},children:(0,i.jsx)(N.Z,{control:(0,i.jsx)(O.Z,{checked:"option2"===D,onChange:handleChange2,value:"option2"}),label:"Verified Students Only"})}),(0,i.jsx)("br",{}),(0,i.jsx)(J.Z,{margin:"dense",name:"phoneNumber",id:"phoneNumber",label:"Phone Number",defaultValue:o.phoneNumber,type:"tel",fullWidth:!0,error:null===(t=x.phoneNumber)||void 0===t?void 0:t.error,helperText:null===(n=x.phoneNumber)||void 0===n?void 0:n.message,variant:"standard",inputProps:{maxLength:16}}),(0,i.jsx)("br",{}),(0,i.jsx)(a.Z,{sx:{ml:2},children:(0,i.jsx)(N.Z,{control:(0,i.jsx)(O.Z,{checked:"option1"===W,onChange:handleChange3,value:"option1"}),label:"Show Phone Number to Registered Users"})}),(0,i.jsx)(a.Z,{sx:{ml:2},children:(0,i.jsx)(N.Z,{control:(0,i.jsx)(O.Z,{checked:"option2"===W,onChange:handleChange3,value:"option2"}),label:"Verified Students Only"})}),(0,i.jsx)("br",{}),(0,i.jsx)("br",{}),(0,i.jsx)(R.Z,{type:"submit",name:"saveSettings",variant:"contained",color:"primary",sx:{color:"white"},fullWidth:!0,children:"Save Settings"}),(0,i.jsxs)(c.ZP,{container:!0,spacing:3,justifyContent:"center",pt:6,children:[(0,i.jsx)(c.ZP,{item:!0,xs:12,sm:6,md:6,lg:6,children:(0,i.jsx)(R.Z,{type:"submit",name:"resetPassword",variant:"contained",color:"error",sx:{color:"white"},fullWidth:!0,children:"Reset Password"})}),(0,i.jsx)(c.ZP,{item:!0,xs:12,sm:6,md:6,lg:6,children:(0,i.jsx)(R.Z,{type:"submit",name:"deleteAccount",variant:"contained",color:"error",sx:{color:"white"},fullWidth:!0,children:"Delete Account"})})]}),(0,i.jsx)("br",{})]})]}),(0,i.jsxs)(V.Z,{open:I,onClose:handleProfileImageDialogClose,"aria-labelledby":"responsive-dialog-title",children:[(0,i.jsx)(T.Z,{id:"responsive-dialog-title",children:"Upload Profile Image"}),(0,i.jsx)(B.Z,{children:(0,i.jsxs)("div",{...Q(),style:{border:"1px dashed gray",padding:"20px",cursor:"pointer"},children:[(0,i.jsx)("input",{...X()}),(0,i.jsx)(s.Z,{variant:"body1",children:"Drag & drop an image here, or click to select one"})]})}),(0,i.jsx)(F.Z,{children:(0,i.jsx)(R.Z,{autoFocus:!0,onClick:handleProfileImageDialogClose,color:"primary",children:"Cancel"})})]}),(0,i.jsxs)(V.Z,{open:P,onClose:handleHeroDialogClose,"aria-labelledby":"responsive-dialog-title",children:[(0,i.jsx)(T.Z,{id:"responsive-dialog-title",children:"Upload Banner Image"}),(0,i.jsx)(B.Z,{children:(0,i.jsxs)("div",{...$(),style:{border:"1px dashed gray",padding:"20px",cursor:"pointer"},children:[(0,i.jsx)("input",{...K()}),(0,i.jsx)(s.Z,{variant:"body1",children:"Drag & drop an image here, or click to select one"})]})}),(0,i.jsx)(F.Z,{children:(0,i.jsx)(R.Z,{autoFocus:!0,onClick:handleHeroDialogClose,color:"primary",children:"Cancel"})})]})]})}function FavoriteListings(e){let{user:t}=e,[n,s]=(0,r.useState)([]),[l,o]=(0,r.useState)(1),fetchListingsByIds=async e=>{let t=(0,L.IO)((0,L.hJ)(D.db,"listings"),(0,L.ar)((0,L.Jm)(),"in",e),(0,L.b9)(10)),n=await (0,L.PL)(t),i=[];return n.forEach(e=>{i.push({id:e.id,...e.data()})}),i};return(0,r.useEffect)(()=>{let fetchListings=async()=>{let e=t.favoriteListings,n=[];for(let t=0;t<e.length;t+=10)n.push(e.slice(t,Math.min(t+10,e.length)));let i=[];for(let e of n)await fetchListingsByIds(e).then(e=>{i.push(e)}).catch(e=>{console.error(e)});let r=i.flat();r.sort((e,t)=>t.createdAt.seconds-e.createdAt.seconds),s(r)};fetchListings()},[]),(0,i.jsxs)(a.Z,{px:3,py:2,children:[(0,i.jsx)(c.ZP,{container:!0,spacing:2,children:n.slice((l-1)*10,10*l).map(e=>{let t=e.location.split(", "),n=t.length>2?"".concat(t[1],", ").concat(t[2]):e.location;return(0,i.jsx)(c.ZP,{item:!0,children:(0,i.jsx)(k.Z,{listingId:e.id,title:e.title,createdAt:e.createdAt,updatedAt:e.updatedAt,description:e.description,images:e.images,location:n,price:e.price,studentVerification:e.studentVerification,priceHistory:e.priceHistory})},e.id)})}),(0,i.jsx)(u.Z,{spacing:2,alignItems:"center",marginY:5,children:(0,i.jsx)(U.Z,{count:Math.ceil(n.length/10),page:l,onChange:(e,t)=>{o(t)}})})]})}var _=n(87127),W=n(35266),z=n(7637),Y=n(38212),q=n(93619),Q=n(57292),X=n(58991),ProfileTabs_AdminPanel=()=>{let[e,t]=(0,r.useState)([]),[n,s]=(0,r.useState)([]),[d,u]=(0,r.useState)(null),[x,p]=(0,r.useState)(null),[m,j]=(0,r.useState)(!1),[f,Z]=(0,r.useState)(1),[b,v]=(0,r.useState)(1),[y,S]=(0,r.useState)(!1),[I,C]=(0,r.useState)("success"),[P,A]=(0,r.useState)("");(0,r.useEffect)(()=>{let fetchUsersAndListings=async()=>{j(!0);try{let e=(0,L.hJ)(D.db,"users"),n=await (0,L.PL)(e),i=n.docs.map(e=>({id:e.id,...e.data()}));t(i);let r=(0,L.hJ)(D.db,"listings"),a=await (0,L.PL)(r),l=a.docs.map(e=>({id:e.id,...e.data()}));s(l)}catch(e){console.error("Error fetching data: ",e)}j(!1)};fetchUsersAndListings()},[]);let handleCloseAlert=(e,t)=>{"clickaway"!==t&&S(!1)},handleSearchUser=async()=>{j(!0);try{let e=(0,L.hJ)(D.db,"users"),n=(0,L.IO)(e,(0,L.ar)("name","==",d)),i=await (0,L.PL)(n);if(i.empty)console.log("No matching users.");else{let e=i.docs.map(e=>({id:e.id,...e.data()}));t(e)}}catch(e){console.error("Error searching users: ",e)}j(!1)},handleSearchListing=async()=>{j(!0);try{let e=(0,L.hJ)(D.db,"listings"),t=(0,L.IO)(e,(0,L.ar)("title","==",x)),n=await (0,L.PL)(t);if(n.empty)console.log("No matching listings.");else{let e=n.docs.map(e=>({id:e.id,...e.data()}));s(e)}}catch(e){console.error("Error searching listings: ",e)}j(!1)},handleDeleteListing=async e=>{try{let t=(0,L.JU)(D.db,"listings",e);await (0,L.oe)(t),S(!0),C("success"),A("Listing deleted successfully!")}catch(e){console.error("Error deleting listing: ",e),S(!0),C("error"),A("Failed to delete listing.")}};return m?(0,i.jsx)(o.Z,{}):(0,i.jsxs)(a.Z,{sx:{padding:"16px"},children:[(0,i.jsxs)(c.ZP,{container:!0,spacing:2,children:[(0,i.jsxs)(c.ZP,{item:!0,xs:12,md:6,children:[(0,i.jsx)(_.Z,{options:e.map(e=>e.name),getOptionLabel:e=>e,value:d,onChange:(e,t)=>{u(t)},renderInput:e=>(0,i.jsx)(J.Z,{...e,label:"Search User",margin:"normal"})}),(0,i.jsx)(R.Z,{startIcon:(0,i.jsx)(X.Z,{}),onClick:handleSearchUser,children:"Search"}),(0,i.jsx)(W.Z,{children:e.slice((f-1)*5,5*f).map(e=>(0,i.jsxs)(z.ZP,{children:[(0,i.jsx)(Y.Z,{primary:e.name}),(0,i.jsx)(q.Z,{children:(0,i.jsx)(h.Z,{title:"Delete User",children:(0,i.jsx)(g.Z,{edge:"end",onClick:()=>handleDeleteListing(listing.id),children:(0,i.jsx)(w.Z,{})})})})]},e.id))}),(0,i.jsx)(U.Z,{count:Math.ceil(e.length/5),page:f,onChange:(e,t)=>{Z(t)}})]}),(0,i.jsxs)(c.ZP,{item:!0,xs:12,md:6,children:[(0,i.jsx)(_.Z,{options:n.map(e=>e.title),getOptionLabel:e=>e,value:x,onChange:(e,t)=>{p(t)},renderInput:e=>(0,i.jsx)(J.Z,{...e,label:"Search Listing",margin:"normal"})}),(0,i.jsx)(R.Z,{startIcon:(0,i.jsx)(X.Z,{}),onClick:handleSearchListing,children:"Search"}),(0,i.jsx)(W.Z,{children:n.slice((b-1)*5,5*b).map(e=>(0,i.jsxs)(z.ZP,{children:[(0,i.jsx)(Y.Z,{primary:e.title}),(0,i.jsx)(q.Z,{children:(0,i.jsx)(h.Z,{title:"Delete",children:(0,i.jsx)(g.Z,{edge:"end",onClick:()=>handleDeleteListing(e.id),children:(0,i.jsx)(w.Z,{})})})})]},e.id))}),(0,i.jsx)(U.Z,{count:Math.ceil(n.length/5),page:b,onChange:(e,t)=>{v(t)}})]})]}),(0,i.jsx)(Q.Z,{open:y,autoHideDuration:6e3,onClose:handleCloseAlert,anchorOrigin:{vertical:"top",horizontal:"left"},children:(0,i.jsx)(l.Z,{onClose:handleCloseAlert,severity:I,sx:{width:"100%"},children:P})})]})};let AdminBadge=()=>(0,i.jsx)(s.Z,{color:"error",component:"span",children:"(Admin)"});function Profile(e){let{params:t}=e,[n,U]=(0,r.useState)({isAdmin:!1,isStudent:!1}),[k,L]=(0,r.useState)(!1),[D,E]=(0,r.useState)(!0),[J,N]=(0,r.useState)(),[O,R]=(0,r.useState)(!1),[V,T]=(0,r.useState)(0),[B,F]=(0,r.useState)(null),[M,H]=(0,r.useState)("https://www.calpoly.edu/sites/calpoly.edu/files/inline-images/20210403-SpringScenics-JoeJ0020.jpg"),[_,W]=(0,r.useState)(!1),[z,Y]=(0,r.useState)(!1),{getUser:q,isLoggedIn:Q,isAdmin:X}=(0,b.useAuth)(),$=(0,Z.useRouter)();(0,r.useEffect)(()=>{if(z){let e=setTimeout(()=>{$.push("/home")},5e3);return()=>clearTimeout(e)}},[z,$]);let K=t.id;if((0,r.useEffect)(()=>{(0,v.PR)(K).then(e=>{if(!e){U(e),E(!1);return}if(""==e.profileImage&&(e.profileImage=null),""==e.heroImage&&(e.heroImage=null),e.uid=K,Q()){let t=q();t.uid==K?(L(!0),t.emailVerified&&"calpoly.edu"==t.email.split("@").pop()&&!e.isStudent&&fetch("/api/verify/".concat(K),{method:"put"}).catch(e=>{console.error(e),N(e.message)})):X().then(e=>{e&&L(!0)}).catch(e=>{console.error(e),N(e.message)})}let checkAdminStatus=async()=>{let e=await X();R(e)};Q()&&checkAdminStatus(),U(e),E(!1)}).catch(e=>{console.error(e),N(e.message)})},[Q,X]),!D){if(!n)return(0,i.jsx)(a.Z,{sx:{display:"flex",flexDirection:"column",alignItems:"center",padding:"20px",border:"2px solid #ff0000",borderRadius:"8px",backgroundColor:"#ffeeee"},children:(0,i.jsx)(s.Z,{variant:"h6",color:"error",margin:30,children:"User not found!"})});if(""==n.name){if(k){$.push("/setup");return}return(0,i.jsx)(a.Z,{sx:{display:"flex",flexDirection:"column",alignItems:"center",padding:"20px",border:"2px solid #ff0000",borderRadius:"8px",backgroundColor:"#ffeeee"},children:(0,i.jsx)(s.Z,{variant:"h6",color:"error",margin:30,children:"User has not set up their page yet!"})})}}return z?(0,i.jsxs)(a.Z,{sx:{display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,i.jsx)(s.Z,{variant:"h4",gutterBottom:!0,children:"You are now logged in!"}),(0,i.jsx)(s.Z,{children:"You will be redirected to the home screen in 5 seconds..."})]}):(0,i.jsxs)(a.Z,{sx:{height:"100vh",display:"flex",flexDirection:"column",alignItems:"center"},children:[!D&&(0,i.jsx)(a.Z,{sx:{width:"100%",height:300,backgroundImage:n.heroImage?"url(".concat(n.heroImage,")"):"url(".concat("https://www.calpoly.edu/sites/calpoly.edu/files/inline-images/20210403-SpringScenics-JoeJ0020.jpg",")"),backgroundSize:"cover",backgroundPosition:"center",position:"relative"}}),J&&(0,i.jsx)(l.Z,{severity:"error",children:J}),D?(0,i.jsx)(o.Z,{sx:{height:"100vh"}}):(0,i.jsxs)(c.ZP,{container:!0,spacing:2,alignItems:"center",justifyContent:"center",mt:3,children:[(0,i.jsx)(c.ZP,{item:!0,children:(0,i.jsx)(d.Z,{alt:"Profile Picture",src:n.profileImage,sx:{width:80,height:80},children:(0,i.jsx)(y.Z,{})})}),(0,i.jsxs)(c.ZP,{item:!0,children:[(0,i.jsxs)(s.Z,{variant:"h4",gutterBottom:!0,children:[n.name,n.isVerified&&(0,i.jsx)(h.Z,{title:"The user is a verified student.",children:(0,i.jsx)(A.Z,{color:"primary"})}),n.isAdmin&&(0,i.jsx)(AdminBadge,{})," "]}),(0,i.jsxs)(u.Z,{direction:"row",children:[(0,i.jsx)(s.Z,{variant:"subtitle1",children:"Seller"}),(0,i.jsx)(h.Z,{title:"User is a student",children:(0,i.jsx)(a.Z,{pl:1,children:n.isStudent&&(0,i.jsx)(S.Z,{})})})]})]}),(0,i.jsxs)(c.ZP,{item:!0,xs:12,sm:"auto",children:[(0,i.jsx)(g.Z,{"aria-label":"User Actions",onClick:e=>{F(e.currentTarget)},children:(0,i.jsx)(P.Z,{})}),(0,i.jsxs)(x.Z,{id:"long-menu",anchorEl:B,open:!!B,onClose:()=>{F(null)},children:[(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)(p.Z,{onClick:()=>handleUserActions("delete"),sx:{color:"red"},children:[(0,i.jsx)(w.Z,{})," Delete Account"]})}),(0,i.jsxs)(p.Z,{onClick:()=>handleUserActions("report"),children:[(0,i.jsx)(I.Z,{})," Report User"]}),(0,i.jsxs)(p.Z,{onClick:()=>handleUserActions("share"),children:[(0,i.jsx)(C.Z,{})," Share Profile"]})]})]})]}),(0,i.jsx)(m.Z,{sx:{my:2,width:"100%"}}),(0,i.jsxs)(j.Z,{value:V,onChange:(e,t)=>{T(t)},centered:!0,children:[(0,i.jsx)(f.Z,{label:"My Listings"}),k&&(0,i.jsx)(f.Z,{label:"Settings"}),k&&(0,i.jsx)(f.Z,{label:"Favorites"}),k&&(0,i.jsx)(f.Z,{label:"Purchase History"}),k&&(0,i.jsx)(f.Z,{label:"Admin Panel"})]}),0===V&&!D&&(0,i.jsx)(MyListings,{user:n}),1===V&&!D&&k&&(0,i.jsx)(Settings,{user:n,setUser:U,setCurrentTab:T}),2===V&&!D&&k&&(0,i.jsx)(FavoriteListings,{user:n}),3===V&&!D&&k&&(0,i.jsx)("div",{children:"Not implemented yet"}),4===V&&!D&&k&&(0,i.jsx)(ProfileTabs_AdminPanel,{user:n})]})}},94145:function(e,t,n){"use strict";n.d(t,{Ix:function(){return uploadImage},Nq:function(){return updateUser},PR:function(){return getUser},r4:function(){return createUser}});var i=n(70148),r=n(24086),s=n(69584);async function uploadImage(e,t){if(t.size>5e6)throw Error("Image cannot be more than 5 MB large");if(!/\.(jpeg|jpg|png)$/i.test(t.name))throw Error("Image has an invalid extension. Allowed: jpg, png");let n="".concat(Math.floor(1e8+9e8*Math.random()),".").concat(t.name.split(".").pop()),r="images/".concat(e,"/").concat(n),a=(0,s.iH)(i.tO,r);try{await (0,s.KV)(a,t);let e=await (0,s.Jt)(a);return e}catch(e){throw console.error("Error uploading image:",e),e}}async function createUser(e,t){let n=(0,r.JU)(i.db,"users",e),s=(0,r.JU)(i.db,"users",e,"private","contact"),a=(0,r.JU)(i.db,"users",e,"private","favorites");await (0,r.pl)(n,{isAdmin:!1,isStudent:!1,isVerified:!1,name:"",profileImage:"",heroImage:"",contactInfoVisibility:!1}).catch(e=>{throw e}),await (0,r.pl)(s,{email:t,phoneNumber:"",location:""}).catch(e=>{throw e}),await (0,r.pl)(a,{favoriteListings:[],favoriteUsers:[]}).catch(e=>{throw e})}async function getUser(e){let t=(0,r.JU)(i.db,"users",e),n=(0,r.JU)(i.db,"users",e,"private","contact"),s=(0,r.JU)(i.db,"users",e,"private","favorites"),a=null,l=null,o=null;return(await (0,r.QT)(t).then(e=>{e.exists()&&(a=e.data())}).catch(e=>{throw e}),a)?(await (0,r.QT)(n).then(e=>{e.exists()&&(l=e.data())}).catch(()=>{}),await (0,r.QT)(s).then(e=>{e.exists()&&(o=e.data())}).catch(()=>{}),{...a,...l,...o}):null}async function updateUser(e,t){let{email:n,isVerified:s,isAdmin:a,name:l,phoneNumber:o,location:c,profileImage:d,heroImage:h,isStudent:u,contactInfoVisibility:g,favoriteListings:x,favoriteUsers:p}=t,m={isAdmin:a,isStudent:u,isVerified:s,name:l,profileImage:d,heroImage:h,contactInfoVisibility:g},j={email:n,phoneNumber:o,location:c},f={favoriteListings:x,favoriteUsers:p};Object.keys(m).forEach(e=>void 0===m[e]&&delete m[e]),Object.keys(j).forEach(e=>void 0===j[e]&&delete j[e]),Object.keys(f).forEach(e=>void 0===f[e]&&delete f[e]);let Z=(0,r.JU)(i.db,"users",e),b=(0,r.JU)(i.db,"users",e,"private","contact"),v=(0,r.JU)(i.db,"users",e,"private","favorites");m&&await (0,r.r7)(Z,m),j&&await (0,r.r7)(b,j),f&&await (0,r.r7)(v,f)}}},function(e){e.O(0,[358,565,990,978,866,874,599,739,116,787,422,630,391,895,127,856,506,933,6,971,472,744],function(){return e(e.s=97440)}),_N_E=e.O()}]);