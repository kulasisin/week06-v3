import{a as c}from"./axios-L6U4YIEh.js";import{_ as m,c as u,a as s,g as _,h as l,v as d,F as p,o as f}from"./index-FjkmL_Vf.js";var h={VITE_APP_API_URL:"",VITE_APP_API_NAME:"",BASE_URL:"/week06-v3/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:w}=h,g={data(){return{user:{username:"",password:""}}},methods:{login(){const r=`${w}/admin/signin`;c.post(r,this.user).then(e=>{const{token:n,expired:a}=e.data;document.cookie=`myToken=${n}; expires=${new Date(a)}; path=/`,this.$router.push("/admin/products")}).catch(()=>{alert("登入失敗")})}}},v=s("h2",null,"登入頁面",-1),b={class:"container"},E={class:"row justify-content-center"},P=s("h1",{class:"h3 mb-3 font-weight-normal"}," 請先登入 ",-1),x={class:"col-8"},V={class:"form-floating mb-3"},k=s("label",{for:"username"},"Email address",-1),y={class:"form-floating"},A=s("label",{for:"password"},"Password",-1),U=s("button",{class:"btn btn-lg btn-primary w-100 mt-3",type:"submit"}," 登入 ",-1);function D(r,e,n,a,t,i){return f(),u(p,null,[v,s("div",b,[s("div",E,[P,s("div",x,[s("form",{id:"form",class:"form-signin",onSubmit:e[2]||(e[2]=_((...o)=>i.login&&i.login(...o),["prevent"]))},[s("div",V,[l(s("input",{type:"email",class:"form-control",id:"username",placeholder:"name@example.com","onUpdate:modelValue":e[0]||(e[0]=o=>t.user.username=o),required:"",autofocus:""},null,512),[[d,t.user.username]]),k]),s("div",y,[l(s("input",{type:"password",class:"form-control",id:"password",placeholder:"Password","onUpdate:modelValue":e[1]||(e[1]=o=>t.user.password=o),required:""},null,512),[[d,t.user.password]]),A]),U],32)])])])],64)}const T=m(g,[["render",D]]);export{T as default};
