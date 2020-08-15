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

export interface ITeamCreationDto {
    name: string;
    memberIds: string[];
}

const TeamsModal: React.FunctionComponent<ITeamsModalProps> = ({
                                                                   modalShown,
                                                                   hideModal, createTeam,
                                                                   isModalLoading,
                                                                   companyUsers
}) => {

    const validationSchema = yup.object().shape({name: yup.string().required('required')});

    const onSubmit = values => createTeam({name: values.name, memberIds: values.memberIds});

    const userOptions =  companyUsers.map(u=> ({ key: u.id,text: u.userName,value: u.id,icon: 'user circle outline'}));

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
                initialValues={{name: '',  memberIds: []}}
                onSubmit={onSubmit}>{props =>
                <Form onSubmit={props.handleSubmit}>

                    <Header as='h2'>Team name</Header>

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

                    <FieldArray name="memberIds">{({push, remove}) => (
                        <div>
                            <Form.Dropdown
                                scrolling
                                closeOnEscape
                                trigger={props.values.memberIds.length !== userOptions.length ?
                                    "Add new members to this team" :
                                    "No more users :("}
                                options={userOptions.filter(u => !props.values.memberIds.includes(u.value))}
                                onChange={(event, data) => push(data.value)}
                            />
                            <div className={styles.items_container}>
                                {userOptions.filter(u => props.values.memberIds.includes(u.value))
                                    .map((member, index) => (
                                        <TeamsModalItem key={index} userName={member.text} index={index}
                                                        remove={remove}/>
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
