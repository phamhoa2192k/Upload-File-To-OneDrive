import React from 'react'
import {Table, Button, Container, Jumbotron} from 'reactstrap'
import {Input} from '@material-ui/core';

const BACKEND_SERVER = 'http://localhost:3001'

function FileIcon(props) {
    let name = ""
    switch (props.type) {
        case 'dir':
            name = ""
            break;
        case 'txt':
            name = ""
            break;
        case 'mp3':
            name = ""
            break;
        case 'mp4':
            name = ""
            break;
        case 'doc':
            name = ""
            break;
        case 'doc':
            name = ""
            break;
        case 'pdf':
            name = ""
            break;
        default:
            name = ""
    }
    return <i className={name}></i>
}

function FileComponent(props) {
    function download(id) {
        fetch(`${BACKEND_SERVER}/file/download?id=${id}`)
            .catch(console.log)
    }

    return (
        <tr>
            <td>
                <FileIcon type={props.type}/>
            </td>
            <td>
                {props.file.name}
            </td>
            <td>
                {props.file.type}
            </td>
            <td>
                {props.file.time}
            </td>
            <td>
                {props.file.size}
            </td>
        </tr>
    )
}

export default class File extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            files: []
        }
        this.upload = this.upload.bind(this)
        this.download = this.download.bind(this)
    }

    upload(e) {
        let file = e.target.files[0]
        let formData = new FormData()
        formData.append(file.name, file)
        fetch(`${BACKEND_SERVER}/file/upload`, {
            method: "POST",
            headers: {
                // "Content-Type": "multipart/form-data"
            },
            body: formData
        }).then(res => res.json())
            .then(json => this.setState({
                ...this.state,
                files: json
            }))
            .catch((console.log))
    }

    download() {

    }

    componentDidMount() {
        if (this.props.isAuthenticated) {
            fetch(`${BACKEND_SERVER}/file`)
                .then(res => res.json())
                .then(json => this.setState({
                    ...this.state,
                    files: json
                }))
                .catch(console.log)
        }
    }

    render() {
        if (!this.props.isAuthenticated) return <Jumbotron>Please sign-in</Jumbotron>
        else return (
            <Container className={"body-container"}>
                <Input type={"file"} name={"file"} id={"file"} onChange={this.upload}/>
                <Table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Datetime</th>
                        <th>Size</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.files.map((file, index) => <FileComponent key ={index} file={file}/>)}
                    </tbody>
                </Table>
            </Container>
        )
    }
}