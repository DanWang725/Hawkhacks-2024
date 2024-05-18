from openai import OpenAI
import tiktoken
import os
from dotenv import load_dotenv

OpenAiInitialSystemMessage = """
You are going to play the role of a professor writing a test for your students. It will be in the form of a multiple choice test.
You will be given notes taken from your course and you will have to write a test based on these notes.

In addition, you must follow the following rules no matter what:
1. Respond only with a JSON object. The JSON object must be surrounded by three tick marks and be in the following format:
```{
    {
    "question": "One of the questions you made here",
    "options": ["option 1", "option 2", "option 3", "option 4"],
    "answer": 1
    }, ...
}```
where "answer" is the index of the correct response in the "options" array from 1 to 4.

2. You must ask exactly 5 questions.

3. You must ask questions that are relevant to the notes provided, and that are answerable by a student who has studied the notes and nothing else.

4. You must not ask questions that are too easy or too hard. The questions should be of medium difficulty.

5. You must not ask questions that are too similar to each other. Each question should test a different concept.

6. You must not ask questions that are too specific. The questions should be general enough to be answerable by any student who has studied the notes.
For example, you are forbidden from asking questions that have options that have no creativity and are pure memorization ["Step 1", "Step 2", "Step 3", "Step 4"].
"""


class gptManager:
    
    # use gpt-3.5-turbo for testing because $$$
    # use gpt-4o for production
    model = "gpt-3.5-turbo"
    chatHistory = []
    
    def __init__(self):
        load_dotenv()
        
        self.client = OpenAI(
            organization='org-Wr0OcM4KbkxO8eDGbrgP7XxT',
            project='proj_e5BudJi0QmXDFk7zpXdHmPkP'
        )
        
        self.chat_history.append({
            "role": "system",
            "content": [{
                "type": "text",
                "text": OpenAiInitialSystemMessage
            }]
        })
    
    
    
    def normalize_quotes(self, text):
        quotes = {
            '“': '"',
            '”': '"',
            '‘': "'",
            '’': "'",
        }
        for original, replacement in quotes.items():
            text = text.replace(original, replacement)
        return text
    
    
    
    def questions_no_history(self, notes):
        if not notes:
            print("Error: Can not create questions without notes")
            return
        
        response = self.client.create_chat(
            model=self.model,
            messages=[
                {"role": "system", "content": OpenAiInitialSystemMessage},
                {"role": "user", "content": "Here are the notes:" + notes}
            ]
        )
        
        self.chat_history.append(response)
        return response

