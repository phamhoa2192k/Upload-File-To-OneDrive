import React from 'react'
import {Table, Button, Container, Jumbotron} from 'reactstrap'
import {Input} from '@material-ui/core';

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
    return (
        <tr>
            <td>
                <FileIcon type={props.type}/>
            </td>
            <td>
                {props.file.name}
            </td>
            <td>
                {props.file.type.replace(".", "").toUpperCase()}
            </td>
            <td>
                {props.file.time}
            </td>
            <td>
                {`${(props.file.size/1024).toFixed(1)} KB`}
            </td>
        </tr>
    )
}

export default class File extends React.Component {
    render() {
        return (
            <Container className={"body-container"}>
                <Input type="file" onChange={(e) => this.props.uploadFile(e.target.files[0])}/>
                <Table borderless>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Time upload</th>
                        <th>Size</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.files.map((file, index) => <FileComponent key ={index} file={file}/>)}
                    </tbody>
                </Table>
            </Container>
        )
    }
}