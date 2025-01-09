

export default function BarionsPage() {
  
  console.log("found language:", localStorage.getItem("selectedLanguage") || "Language not was selected yet")
  return (
    <div>
        <h1>Страница барионов </h1>

      <hr></hr>
    </div>

  )
}

