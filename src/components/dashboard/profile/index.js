import React,{useState} from 'react';
import DashLayout from '../../../utils/dash_layout';
import { useForm } from 'react-hook-form';

import { useSelector, useDispatch } from 'react-redux';

const Profile = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {register, handleSubmit,  formState: { errors } } = useForm();
  const [disabled, setDisabled] = useState(false); 

  const submitForm= (data) => {
    console.log(data)
  }
  return (
    <DashLayout
     auth={auth} 
     title="Profile">

      <form onSubmit={handleSubmit(submitForm)}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="name">First name</label>
            <input type="text"
             className="form-control"
             name="name"
             defaultValue={auth.user.name}
             {...register("name", { required: true, maxLength: 20 })}
             />
             {errors.name &&  <span className="error">This field is required</span>}
           
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="lastname">Last name</label>
            <input type="text"
             className="form-control"
             name="lastname" 
              defaultValue={auth.user.lastname}
              {...register("lastname", { required: true, maxLength: 20 })}
            />
            {errors.lastname &&   <span className="error">This field is required</span>}
           
           
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" name="email" 
           defaultValue={auth.user.email}
           {...register("email",{ 
               required: true ,
               pattern:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            
            })}
           />
           {errors.email &&   <span className="error">Please check your email</span>}
         
        </div>

        <div className="mb-3">
          <label htmlFor="address">Address</label>
          <input type="text" className="form-control" name="address"
           defaultValue={auth.user.address}
           {...register("address")}
          />
        </div>

        <div className="row">
          <div className="col-md-5 mb-3">
            <label htmlFor="gen">What are you ?</label>
            <select className="custom-select d-block w-100" name="gen"
            defaultValue={auth.user.gen}
            {...register("gen")}
            >
              <option value="" defaultValue>
                Choose...
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="musician">Musician</option>
              <option value="robot">Robot</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="daw">DAW</label>
            <select className="custom-select d-block w-100" name="daw"
             defaultValue={auth.user.daw}
             {...register("daw")}
            >
              <option value="" defaultValue>
                Choose...
              </option>
              <option value="ableton">Ableton</option>
              <option value="bitwig">Bitwig</option>
              <option value="studio one">Studio one</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="age">Age</label>
            <input type="text" className="form-control" name="age"
               defaultValue={auth.user.age}
               {...register("age")}
            />
          </div>
        </div>

        <hr className="mb-4" />

        <button
          className="btn btn-outline-primary btn-lg btn-block"
          type="submit"
        >
          Update profile
        </button>
      </form>
    </DashLayout>
  );
};
export default Profile;