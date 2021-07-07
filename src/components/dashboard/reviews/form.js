import React, { Component } from 'react';
import {connect} from 'react-redux';
import {toast} from 'react-toastify';

import {Form,Button,Col} from 'react-bootstrap';
import {Formik} from 'formik';
import * as Yup from 'yup'; 

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {addReview,clearReview,getReviewById,editReview} from '../../../store/actions';
import Uploader from './uploader';

class ReviewForm extends Component {
	state={
		mode:'add',
		editor:'',
		editorError:false,
		img:'http://via.placeholder.com/400',
		imgName:'',
		imgError:'',
		disabled:false,
		initialValues:{
			title:'',
			excerpt:'',
			rating:'',
			public:''
		}
	} 

	componentDidMount(){
        const id = this.props.id;

        if(id) {
            this.props.dispatch(getReviewById(id)).then(()=>{
                const reviewById = this.props.reviews.reviewById;
                this.setState({
                    mode:'edit',
                    editor: reviewById.content,
                    img: reviewById.downloadUrl,
                    imgName: reviewById.img,
                    initialValues:{
                        title: reviewById.title,
                        excerpt: reviewById.excerpt,
                        rating: reviewById.rating,
                        public:  reviewById.public
                    }
                });
            }).catch((e)=>{
                this.props.history.push('/dashboard/reviews');
                toast.error('Sorry, the post does not exists',{
                    position:toast.POSITION.BOTTOM_RIGHT
                })
            })
        }
    }
	
		componentWillUnmount(){
			this.props.dispatch(clearReview());
		}

		handleResetForm=(resetForm)=> {
			resetForm({});
			this.setState({
				editor:'',
				img:'http://via.placeholder.com/400',
				imgError:'False',
				disabled:false
			});
			toast.success('congrats',{
				position: toast.POSITION.TOP_RIGHT
			});
		}

		handleImageName = (name,download) => {
			this.setState({img: download,imgName: name})
		}
	

	 handleSubmit=(values,resetForm) => {
		let formData = {...values, content: this.state.editor,img:this.state.imgName};

		if(this.state.mode === 'add'){
            this.props.dispatch(addReview(formData,this.props.auth.user)).then(()=>{
                this.handleResetForm(resetForm);
            });
        } else {
            this.props.dispatch(editReview(formData,this.props.id)).then(()=>{
                this.setState({disable: false});
                toast.success('Congrats you post has been updated',{
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            })
        }
	}

	render(){
		const state = this.state;
		return (
      <Formik
			enableReinitialize
			initialValues={state.initialValues}
			validationSchema={Yup.object({
				title:Yup.string().required('the title is required'),
				excerpt:Yup.string().required('you must add an excerpt'),
				rating:Yup.number().required('the rating is required'),
				public:Yup.string().required('is it public or a draft')
			})}
			onSubmit={(values,{resetForm})=>{
				if(Object.entries(state.editor).length === 0){
					return this.setState({editorError:true})
				}
				
				else if(state.imgName === ''){
					return this.setState({imgError:true,editorError:false})
				}
				else {
					this.setState({disabled:true,editorError:false});
					this.handleSubmit(values,resetForm);
				}

				
			}}
	  >
        {({ 
			values, 
			errors, 
			touched, 
			handleChange,
		 handleSubmit 
		}) => (

          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Col md={8}>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control 
				  type="text" 
				  name="title" 
				  value={values.title}
				  onChange={handleChange}
				   />
				   {errors.title && touched.title ?
				   		<div className="error">{errors.title}</div>
						:null
					}
                 
                </Form.Group>


                <Form.Group>
                  <Form.Label>Excerpt</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    name="excerpt"
                    value={values.excerpt}
				 	onChange={handleChange}
                  />
                   {errors.excerpt && touched.excerpt ?
				   		<div className="error">{errors.excerpt}</div>
						:null
					}
                </Form.Group>
                <Form.Group>
					<CKEditor
						 editor={ ClassicEditor }
						 data={state.editor}
						 onChange={(event,editor) => {
							 this.setState({
								 editor:editor.getData()
							 })
						 } }
					/>
				</Form.Group>
				{state.editorError ? 
				 <div className="error">Sorry , we need something here</div>
				 :null
				}
               

                <Form.Group>
                  <Form.Label>Rating</Form.Label>
                  <Form.Control 
				  as="select" 
				  name="rating" 
				  value={values.rating}
				  onChange={handleChange}
				  >
                    <option value="" defaultValue>
                      Choose...
                    </option>
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                  </Form.Control>
				  {errors.rating && touched.rating ?
				   		<div className="error">{errors.rating}</div>
						:null
					}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Public</Form.Label>
                  <Form.Control 
				  as="select" 
				  name="public" 
				  value={values.public}
				  onChange={handleChange}
				  >
                    <option value="" defaultValue>
                      Choose...
                    </option>
                    <option value="1">Public</option>
                    <option value="0">Draft</option>
                  </Form.Control>
				  {errors.public && touched.public ?
				   		<div className="error">{errors.public}</div>
						:null
					}
                </Form.Group>
                <Button variant="primary" type="submit" disabled={state.disabled}>
                  Submit
                </Button>
              </Col>
              <Col>
                <Uploader
					handleImageName= {this.handleImageName}
					img={state.img}
				/>
				{state.imgError ?
				<div className="error">Add an image please</div>
				:null	
				}
                
              </Col>
            </Form.Row>  
          </Form>
        )}
      </Formik>
    );
	}
}

const mapStateToProps = ( state ) => {
	return {
		reviews:state.reviews,
		auth:state.auth
	}
}

export default connect(mapStateToProps) (ReviewForm);