import XLSX from 'xlsx'
import React from 'react'
import './Input.scss'

const Input = props => {
    const [state, setState] = React.useState({
        arraySheets: [],
        isDragStarted: false,
        textInput: props.textInput,
        error: ''
    })
    const files = React.useRef()
    console.log(XLSX)
    let className = 'file-uploader__wrapper'
    if (state.isDragStarted === true){
        className += ' file-uploader__wrapper-drag'
    }
    if (state.error === 'errorType') {
        className += ' file-uploader__wrapper-error'
    }

    const upLoader = (event) => {
        if (event.target.files) {
            const file = event.target.files[0]
            console.log(event.target.files[0])

            if (file.type !== "application/vnd.ms-excel" &&
                file.type !== "application/excel" &&
                file.type !== "application/x-msexcel" &&
                file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            ) {
                return (setState(prev=> {
                    return {
                        ...prev,
                        error: 'errorType',
                        textInput: `Недопустимый тип файла "${event.target.files[0].name}", выбирите другой файл`
                    }
                }))

            }

            if (file.size>(props.sizeFile*1000000)){
                return (setState(prev=> {
                    return {
                        ...prev,
                        error: 'errorSize',
                        textInput: `Допустимый размер файла ${props.sizeFile}Мб, выбирите другой файл`
                    }
                }))

            }
            else {
                files.current = event.target.files[0]
                setState(prev=> {
                    return {
                        ...prev,
                        error: 'noError',
                        textInput: `Файл - "${file.name}"`
                    }
                })
                convertFiles()

                console.log(state.arraySheets)

            }
            if (files.current) {
                files.current = null
            }
            setState(prev=>{
                return {
                    ...prev,
                    isDragStarted: false
                }
            })
        }
    }

    const convertFiles = () => {
        if (files.current) {
            let fileReader = new FileReader()
            fileReader.readAsBinaryString(files.current)
            fileReader.onload = event => {
                let data = event.target.result
                let workbook = XLSX.read(data,{type:'binary'})
                let list = []
                workbook.SheetNames.forEach(sheet => {

                        list.push(XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]))

                })
                const f = fetchFiles().then(response=>response)
                setState(prev => {
                    return {
                        ...prev,
                        arraySheets: list
                    }
                })

            }

        }
    }
    const fetchFiles = async (list) => {
            try{
                const response = await fetch('http://193.243.158.230:4500/api/import',{
                    method: 'POST',
                    header: {
                        'Authorization': 'test-task',
                    },
                    body: JSON.stringify(list)
                })
                return response
            }
            catch (e) {
                console.log(e)
            }
    }


    console.log(state.isDragStarted)
    return (
        <div className='file-uploader'>
            <div className={className}>
                {state.isDragStarted}
                <input type='file'
                       title=''
                       onChange={upLoader}
                       onDragEnter={()=>setState(prev =>{
                           return {
                               ...prev,
                               isDragStarted: true
                           }
                       })}
                       onDragLeave={()=>setState(prev =>{
                           return {
                               ...prev,
                               isDragStarted: false
                           }
                       })}
                />
                <span>{state.textInput}</span>
            </div>
        </div>
    )
}

export default Input