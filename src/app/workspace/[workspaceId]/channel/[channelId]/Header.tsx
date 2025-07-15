interface HeaderProps{
    title:string;
};
export const Header=({title}:HeaderProps)=>{

   


    return(
        <div className="bg-white border-b h-[49px] flex items-center px-4 overflow-hidden">
            Header:{title}
        </div>
    )
} 