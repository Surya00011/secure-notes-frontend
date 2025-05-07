import {React,useRef,useState} from 'react'
import {Button, Card,Form,Alert} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { MdLockPerson } from 'react-icons/md'
import { sendOtpService, verifyOtpService ,registerService} from '../services/authService'
const Register = () => {
  
  const [message,setMessage]= useState("");
  const [error,setError] =useState("")
  const [isMailVerified,setMailVerified] =useState(false)

  const emailRef = useRef()
  const otpRef = useRef()
  const userNameRef =useRef()
  const passwordRef = useRef()

  const handleOtp = async (e) =>{
    e.preventDefault()
    const email = emailRef.current.value
    try{
      const response = await sendOtpService(email)
      setMessage(response.data||"Otp Sent to your email")
    }catch(error){
      setError("Failed to send email. " + (error.response?.data?.message || error.message));
      setMessage("")
    }
   
  }

  const handelOtpVerification = async (e) =>{
    e.preventDefault()
    const otp = otpRef.current.value
    const email = emailRef.current.value
    try{
      const response = await verifyOtpService(otp,email)
      if(response.message === "OTP verified successfully."){
        setMailVerified(true)
        setMessage("")
        setMessage("Email verifed")
      }else{
        setError("Invalid OTP")
      }
    
    }catch(error){
      setError("Failed to verify OTP. " + (error.response?.data?.message || error.message));
    }
    }
  
  
  const handleRegistration = async (e) =>{
    e.preventDefault()
    if(!isMailVerified){
      setError("Please verify your email first")
    }
    const email = emailRef.current.value
    const username = userNameRef.current.value
    const password = passwordRef.current.value
    try{
      const response = await registerService(email,username,password)
      setMessage("Registration Successfull please Login")
      setMailVerified(false)
    }
    catch(error){
      setError("Failed to register. " + (error.response?.data?.message || error.message));
    }


  }


  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
      <div className="text-center mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                  <h1 className="text-dark" style={{ fontSize: "3rem", fontWeight: "bold" }}>Secure Notes <MdLockPerson /></h1>
      </div>
      <Card style={{ width: '24rem' }} className='p-3 shadow'>

        <Card.Title style={{fontSize:"2rem",padding:"6px",textAlign:"center"}}>Sign Up</Card.Title>
          
          {message&&(<Alert variant='success' dismissible>{message}</Alert>)}
          {error&&(<Alert variant='danger' dismissible>{error}</Alert>)}

        <Card.Body>
          <Form onSubmit={handleRegistration}>
             <Form.Group>
                 <Form.Label>Enter Email</Form.Label>
                 <div className="d-flex pb-2">
                       <Form.Control
                          placeholder="youremail@gmail.com"
                          type="email"
                          ref={emailRef}
                          required
                        />
                      <Button
                           onClick={handleOtp}
                           variant="primary"
                           style={{ marginLeft: "10px", whiteSpace: "nowrap" }}
                      >
                             Send OTP
                       </Button>
                  </div>
              </Form.Group>

              <Form.Group>
                <div className="d-flex pb-2">
                <Form.Control
                      type='text'
                      placeholder="Enter OTP"
                      ref={otpRef}
                      required
                   />
                   <Button 
                       onClick={handelOtpVerification}
                       variant="primary"
                       style={{ marginLeft: "10px", whiteSpace: "nowrap" }}
                    >
                      Verify OTP
                    </Button>
                </div> 
              </Form.Group>
              <hr/>
              <Form.Group>
                <div className="d-flex mb-2">
                <Form.Control 
                    type='text'
                    placeholder="Username"
                    required
                    ref={userNameRef}
                  >
                  </Form.Control>
                </div>
                  
              </Form.Group>
              <Form.Group>
                <div className="d-flex mb-2">
                    <Form.Control
                    type='password'
                    placeholder="Password"
                    required
                    ref={passwordRef}
                    >

                    </Form.Control>
                
                </div>
              </Form.Group>
              <Button
                type="submit"
                variant="primary"
                className='w-100 mb-3'
              > 
                Sign up
              </Button>
          </Form>

          <div className="d-flex justify-content-center ">
              <Link 
                to="/" className="text-decoration-none"
              >
                  Back to login
              </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Register