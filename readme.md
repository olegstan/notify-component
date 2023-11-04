#Usage 

###define in router

```
import {NotifyContainer} from "notify-component";

return(<ErrorBoundary>
    <Routes>
      <Route element={<>
        <HeaderLanding/>
        <Layout/>
      </>}>
        <Route path="/agreement" element={<MainPage/>}/>
        <Route path="/policy" element={<MainPage/>}/>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/login" element={<Forbidden/>}/>
        <Route path='*' element={<NotFound/>} />
      </Route>
    </Routes>
    <NotifyContainer/> <----- here
</ErrorBoundary>);
}
```

###Use it anywhere

```
NotifyManager.info('Success header', 'Success text')
NotifyManager.error('Error header', 'Error text')

```

###Uploading file

```
let id = NotifyManager.id();//it creats unique id
NotifyManager.once(id, '', 'Upload text', 'waiting', 99999999999)//it waits forever

NotifyManager.delete(id);//it deletes a loader
```
