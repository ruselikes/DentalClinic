import '../App.css';
const films = [
    {
        title:"Avengers",duration:"155 minutes",id: 1
    },
    
    {
        title:"La La Land",duration:"1:56:23",id: 2 //для реакта нужно показать,что каждый элемент уникален
    }
]
export function SecondElement() {
    return(
        <>
        <h2>Top of Films</h2>
        {
        films.map((video) => {
            return (
                <div class="fcard" key={video.id}>
                    <p>{video.title}</p>
                    <p>{video.duration}</p>
                </div>
            )
            })
        }
    
        </>
    );
    
}