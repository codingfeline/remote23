const Footer = () => {
  return (
    <footer className="p-2 mt-5 bg-slate-200">
      <ul
        className=" 
        items-center 
        tracking-widest md:tracking-normal 
      "
      >
        <li>&copy; {new Date().getFullYear()}</li>
      </ul>
    </footer>
  )
}

export default Footer
