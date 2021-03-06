import { Button, Group, MediaQuery, Paper, Select, Stack, Text, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { API_URL } from "../../Constants";
import { showNotification } from "@mantine/notifications";

interface SubmitProps {
    contestTag: string;
}

const Submit: NextPage<SubmitProps> = ({ contestTag }) => {

    const form = useForm({
        initialValues: {
            problem: "",
            code: "",
            language: "",
        }
    })

    const [problems, setProblems] = useState(['Loading...'])
    const [isCodePasted, setIsCodePasted] = useState(false);

    useEffect(() => {
        axios.get(`${API_URL}/problems/${contestTag}`)
            .then(res => setProblems(res.data.map((e: any) => e.name)))
            .catch(() => showNotification({
                color: 'red',
                title: 'Error',
                message: 'Could not load problems, please try again later'
            }))
    }, [contestTag]);

    const exampleCode = `int main() {
    return 0;
}`

    return (
        <Paper p={12} sx={{
            width: '50%',
            '@media (max-width: 750px)': {
                width: '100%'
            }
        }}>
            <Stack>
                <Text size="xl">Submit solution</Text>
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <Select
                        label="Problem"
                        data={problems}
                        placeholder="Problem Name"
                        required
                        {...form.getInputProps('problem')}
                    />

                    <Textarea
                        label="Code"
                        placeholder={exampleCode}
                        autosize
                        minRows={3}
                        mt={10}
                        onInput={(e) => {
                            if (e.currentTarget.value && e.currentTarget.value != '') setIsCodePasted(true);
                            else setIsCodePasted(false);
                        }} 
                        {...form.getInputProps('code')}/>

                    <Select
                        label="Programming language"
                        data={['c++', 'javascript', 'python', 'rust']}
                        required={isCodePasted}
                        disabled={!isCodePasted}
                        mt={10}
                        {...form.getInputProps('language')}
                    />

                    <Group position="right"><Button type="submit" mt={10}>Submit</Button></Group>
                </form>
            </Stack>
        </Paper>
    );
};

export default Submit;
