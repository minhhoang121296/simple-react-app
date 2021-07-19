import styled from 'styled-components';
import { Col, Row } from '../UI/Grid';
import { useForm } from '../hooks/useForm'
import { useEffect } from 'react';
import { media } from '../global';

interface SendMail {
    from: string;
    to: string;
    message: string;
}

function MailBox() {
    const {handleSubmit, handleChange, data: formData, errors, setFieldsValue} = useForm<SendMail>({
        validations: {
            from: {
                pattern: {
                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'not invalid email'
                },
                
            },
            to: {
                pattern: {
                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'not invalid email'
                }
            },
            message: {
                custom: {
                    isValid: (value) => value.length < 2000,
                    message: 'maximum 2000 char'
                }
            }
        },
        onSubmit: (data) => {
            localStorage.setItem('from', data.from)
            alert(JSON.stringify(data));
        },
    })

    useEffect(() => {
        let from = localStorage.getItem('from');
        if(from === null) {
            from = '';
        }

        console.log('from', localStorage.getItem('from'));
        setFieldsValue({from})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [])

    const clearSender = () => {
        localStorage.clear();
        setFieldsValue({from: ''})
    }

    return <MailBoxWrapper>
        <form onSubmit={handleSubmit}>
            <Row>
                <Col size={1}>
                    <Row>
                        <Col size={1}>
                            <label htmlFor="from">From</label>
                        </Col>
                        <Col size={3}>
                            <input type="email" onChange={handleChange('from')} value={formData.from || ''}/>
                            {errors.from && <p className="error">{errors.from}</p>}
                        </Col>
                    </Row>
                </Col>
                <Col size={1}>
                    <Row>
                        <Col size={1}>
                            <label htmlFor="to">To</label>
                        </Col>
                        <Col size={3}>
                            <input type="email" onChange={handleChange('to')} value={formData.to || ''}/>
                            {errors.to && <p className="error">{errors.to}</p>}
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col size={1}>
                    <textarea onChange={handleChange('message')} value={formData.message || ''}>
                    </textarea>
                    {errors.message && <p className="error">{errors.message}</p>}
                </Col>    
            </Row>
            <Row>
                <Col size={1}>
                    <button type="button" onClick={clearSender}>Clear Sender</button>    
                </Col>
                <Col size={1}>
                    <button type="submit">Send</button>

                </Col>
            </Row>
        </form>
    </MailBoxWrapper>

    ;
}

const MailBoxWrapper = styled.div`
    border: 2px solid #000;
    margin-top: 100px;
    width: 500px;
    margin-right: auto;
    margin-left: auto;
    padding: 6px;
    input {
        width: 100%;
    }

    textarea {
        width: 100%;
        min-height: 300px;
    }

    button {
        width: 100%;
    }
    ${media.phone} {
        width: 300px;
    }
`;

export default MailBox;
