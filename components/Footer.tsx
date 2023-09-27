const Footer = () => {
  return (
    <footer className="p-2  bg-blue-100 border border-t border-blue-200">
      <ul
        className=" 
        items-center 
        tracking-widest md:tracking-normal 
      "
      >
        <li>&copy; {new Date().getFullYear()} Technical Helpdesk CMS</li>
      </ul>
    </footer>
  )
}

export default Footer
