import React from "react";
import {Button, Modal, Form, Header} from "semantic-ui-react";
import styles from "./styles.module.sass";
import {FieldArray, Formik} from "formik";
import *as yup from 'yup';
import TeamsModalItem from "./TeamModalItem";
import {IUserInfo} from "../../models/user/types";

export interface ITeamsModalProps {
    modalShown: boolean;
    isModalLoading: boolean;
    companyUsers: IUserInfo[];

    hideModal(): void;

    createTeam(team: ITeamCreationDto): void;
}

export interface IDropdownItem{
    key: string;
    text: string;
    value: string;
}

export interface ITeamCreationDto {
    name: string;
    companyId: string;
    memberIds: string[];
}

const TeamsModal: React.FunctionComponent<ITeamsModalProps> = ({
                                                                   modalShown,
                                                                   hideModal, createTeam,
                                                                   isModalLoading,
                                                                   companyUsers
}) => {
    const validationSchema = yup.object().shape({
        name: yup.string().required('required'),
        companyId: yup.string().required("You must chose a company")
    });

    const onSubmit = values => {
        console.log(values);
        createTeam({name: values.name, companyId: values.companyId, memberIds: values.members});
    };

    const companyOptions = [
        {
            key: "1",
            text: "Maksimko",
            value: "afa14521-b8db-44a7-b9b7-98bd8244cc19"
        },
        {
            key: "2",
            text: "Qaksimko",
            value: "afa14521-b8db-44a7-b9b7-98bd8244cc19"
        }
        ,
        {
            key: "3",
            text: "Waksimko",
            value: "afa14521-b8db-44a7-b9b7-98bd8244cc19"
        }
        ,
        {
            key: "4",
            text: "Daksimko",
            value: "afa14521-b8db-44a7-b9b7-98bd8244cc19"
        }
        ,
        {
            key: "5",
            text: "Faksimko",
            value: "afa14521-b8db-44a7-b9b7-98bd8244cc19"
        }
        ,
        {
            key: "6",
            text: "Vaksimko",
            value: "afa14521-b8db-44a7-b9b7-98bd8244cc19"
        },
        {
            key: "7",
            text: "Paksimko",
            value: "afa14521-b8db-44a7-b9b7-98bd8244cc19"
        }
        ,
        {
            key: "8",
            text: "Laksimko",
            value: "afa14521-b8db-44a7-b9b7-98bd8244cc19"
        }
        ,
        {
            key: "9",
            text: "Kaksimko",
            value: "afa14521-b8db-44a7-b9b7-98bd8244cc19"
        }
        ,
        {
            key: "10",
            text: "jaksimko",
            value: "afa14521-b8db-44a7-b9b7-98bd8244cc19"
        }
        ,
        {
            key: "11",
            text: "zaksimko",
            value: "afa14521-b8db-44a7-b9b7-98bd8244cc19"
        }
    ];

    const userOptions =  companyUsers.map(u=> ({ key: u.id,text: u.userName,value: u.id}));
    // companyUsers.map(u=> { key: u.id,text: u.userName,value: u.id})

    return (
        <Modal
            closeIcon
            open={modalShown}
            onClose={() => hideModal()}
            dimmer={"blurring"}
            className={styles.form_container}>
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={{name: '', companyId: '', members: []}}
                onSubmit={onSubmit}>{props =>
                <Form onSubmit={props.handleSubmit}>
                    <Header as='h2'>Company name</Header>
                    <Form.Input
                        icon="tag"
                        name="name"
                        type="text"
                        placeholder="Enter team name"
                        value={props.values.name}
                        error={
                            props.touched.name && props.errors.name
                                ? props.errors.name
                                : undefined
                        }
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                    >
                    </Form.Input>
                    <Header as='h2'>Members</Header>
                    <FieldArray name="members">{({push, remove}) => (
                        <div>
                            <Form.Dropdown
                                scrolling
                                closeOnEscape
                                selection
                                trigger={props.values.members.length !== userOptions.length ?
                                    "Add new members to this team" :
                                    "No more user :("}
                                options={userOptions.filter(u => !props.values.members.includes(u.value))}
                                onChange={(event, data) => push(data.value)}
                            />
                            <div className={styles.items_container}>
                                {userOptions.filter(u => props.values.members.includes(u.value))
                                    .map((member, index) => (
                                        <TeamsModalItem userName={member.text} index={index} remove={remove}/>
                                    ))}
                            </div>
                        </div>
                    )}</FieldArray>
                    <Button className={styles.submit_button} type="submit" loading={isModalLoading}
                            disabled={isModalLoading} primary>Create</Button>
                </Form>
            }
            </Formik>
        </Modal>
    );
};
export default TeamsModal;