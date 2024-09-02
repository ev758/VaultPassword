import PasswordForm from '../components/PasswordForm.jsx';

function AddPassword() {
  return (
    <>
      <h1 className="title">Vault Password</h1>
      <PasswordForm request="add password"/>
    </>
  )
}

export default AddPassword;