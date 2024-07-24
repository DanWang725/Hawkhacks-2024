from openai import OpenAI
from dotenv import load_dotenv
import json

# TODO: Move this to a separate file
OpenAiInitialSystemMessage = """
You are going to play the role of a professor writing a test for your students. It will be in the form of a multiple choice test.
You will be given notes taken from your course from one unit at a time. Your task is to write a challenging test for your students based on these notes.

In addition, you must follow the following rules no matter what:
1. Respond only with a list of JSON objects. The list must be surrounded by three tick marks and be in the following format:
```[
    {
    "question": "One of the questions you made here",
    "options": ["option 1", "option 2", "option 3", "option 4"],
    "answer": 1
    "explanation": "A short sentence explaining the correct answer, and pointing out how the other options are incorrect."
    }, ...
]```
where "answer" is the index of the correct response in the "options" array from 0 to 3.

2. You must ask around 10 questions unless the notes are so short that it is not possible.

3. You must ask questions that are relevant to the notes provided, and that are answerable by a student who has studied the notes.

4. You must not ask questions that are too easy or too hard. The questions should be of medium difficulty.

5. You must not ask questions that are too similar to each other. Each question should test a different concept.

6. You must not ask questions that are too specific. The questions should be general enough to be answerable by any student who has studied the notes.
For example, you are forbidden from asking questions that have options that have no creativity and are pure memorization ["Step 1", "Step 2", "Step 3", "Step 4"].
7. 65% of the questions to be simple term based questions, 15% of them harder questions and 20% to be very challenging questions applying notes to real life situations.

8. Avoid questions that only require pure memorization of the given content, the questions should test deep understanding of the content being asked.

9. You must include at least 1 question where the answer is the option of "It's a trick question!" and you may choose to have more.

10. Do not create questions in the same order than they appear in the notes.

11. If you are given multiple units, only create questions focused on the last unit given, but you may use the information from the previous units to gain context and understanding.

12. Do not mention or frame questions with the mention of the notes. For example, you cannot say "according to the notes?" at the end of a question.
"""


class ChatCompletionManager:
    
    # use gpt-4o-mini for everything
    # only gpt-4o once we actually can afford it
    model = "gpt-4o-mini"
    chatHistory = []
    
    def __init__(self):
        load_dotenv()
        
        self.client = OpenAI(
            organization='org-Wr0OcM4KbkxO8eDGbrgP7XxT',
            project='proj_e5BudJi0QmXDFk7zpXdHmPkP'
        )
        
        self.chatHistory.append({
            "role": "system",
            "content": [{
                "type": "text",
                "text": OpenAiInitialSystemMessage
            }]
        })
    
    
    
    def normalizeQuotes(self, text):
        quotes = {
            '“': '"',
            '”': '"',
            '‘': "'",
            '’': "'",
        }
        for original, replacement in quotes.items():
            text = text.replace(original, replacement)
        return text
    
    
    def responseToJson(self, response):
        response = self.normalizeQuotes(response)
        
        # TODO: ignore anything outside of the triple backticks
        response = response.replace("```", "")
        
        return json.loads(response)
    
    
    def questionsNoHistory(self, notes):
        if not notes:
            print("Error: Can not create questions without notes")
            return
        
        notes = self.normalizeQuotes(notes)
        
        message = [
            {
                "role": "system", 
                "content": [{
                    "type": "text",
                    "text": OpenAiInitialSystemMessage
                }]
            },
            {
                "role": "user",
                "content": [{
                    "type": "text",
                    "text": "Here are the notes:\n" + notes
                }]
            }
        ]
        
        print("\nAsking ChatGPT for questions without history...")
        openai_response = self.client.chat.completions.create(
            model=self.model,
            messages=message
        )
        
        return openai_response



    def questionsWithHistory(self, notes):
        if not notes:
            print("Error: Can not create questions without notes")
            return
        
        notes = self.normalizeQuotes(notes)
        
        if len(self.chatHistory) <= 2:
            prefix = "Now generate questions for this first unit:\n"
        else:
            prefix = "Here are more notes for the next unit:\n"
        
        self.chatHistory.append(
            {
                "role": "user",
                "content": [{
                    "type": "text",
                    "text": prefix + notes
                }]
            }
        )
        
        # TODO: check if the chat history is not too long
        
        print("\nAsking ChatGPT for questions with history...")
        openai_response = self.client.chat.completions.create(
            model=self.model,
            messages=self.chatHistory
        )
        
        # Add this answer to our chat history
        self.chatHistory.append(
            {
                "role": openai_response.choices[0].message.role,
                "content": [
                    {
                        "type": "text",
                        "text": openai_response.choices[0].message.content
                    }
                ]
            }
        )
        
        return openai_response




# example_notes = """
# Arithmetic Operations
# - Addition, Multiplication, Subtraction and Division done on images
# - Addition is a form of averaging, usually used to reduce noise
# - Subtraction is used to reveal differences between those images and is often used in the detection of change
# - Multiplication involves floating point DNs, if one image is Boolean the result is a **masking op**
# - Division (Ratioing) is one of the most common ops, and is used heavily in vegetation indices

# Vegetation Transformations (Indices)

# - Vegetation Index (VI) is a “synthetic (not natural) image layer” which is created using existing bands of a multispectral image
# - Provides us information that is unique and cannot be found in any other individual bands
# - It *maximizes sensitivity* to plant biophysical parameters, and it *normalizes* impacts of sun angle, canopy background, topography, soil variations
#     - it enables us to see vegetation much more apparently in the new image layer
# - VI is used to quantify/predict vegetation biomass (weight of plant in a given area), productivity (healthiness), leaf area (coverage), and/or vegetative ground cover
# - VI's are mainly a combination of the red and near-infrared bands, but this is not always the case

# Leaf Cell Structure
# - The Near-Infrared (NIR) wavelength reflectance is controlled by the leaf's cell structure
# - The amount of reflectance varies with:
#     - Leaf Age
#     - Health
#     - Species
# - The reflectance is also related to:
#     - leaf thickness and coating
#     - woody tissue
#     - water content
# - Healthy vegetation absorbs blue- and red-light energy to fuel *photosynthesis* and create *chlorophyll*. A plant with more chlorophyll will **reflect more near-infrared energy** than an unhealthy plant.

# Simple Ratios and NDVI (**Normalized Difference** Vegetation Index)
# - The simple ratio takes advantage of the inverse relationship between the chlorophyll absorption of the red radiant energy and increased reflectance of near-infrared (NIR) energy for healthy plant canopies
# - The NIR/Red ratio helps to produce an greyscale image showing variation in biomass (the amount of vegetative matter) and in LAI (**Leaf Area Index**) as well as the state of health (physiological functioning) of plants (magnitude of value will be greater than 1)
# - NDVI is used for estimating net primary production over varying biome types, monitor patterns of vegetative surface, and assess the length of growing seasons
# - Seasonal and interannual changes can be monitored using the NDVI ratio
# - Removes multiplicative noise (illumination differences, cloud shadow, and topographic variation)
# - The fact that sums and differences of bands are used in the NDVI rather than absolute values may make the NDVI more appropriate for use in studies *where comparisons over time for a single area are involved*
#     - **ratio value is not affected by the absolute pixel values in the NIR and R bands**
# - The NDVI is functionally equivalent to and is a nonlinear transform of the simple ratio
# """

# testJSONStr = """```[\n    {\n    "question": "What operation on images is typically used to reduce noise?",\n    "options": ["Multiplication", "Addition", "Subtraction", "Division"],\n    "answer": 2\n    },\n    {\n    "question": "What is the main purpose of using Vegetation Index (VI) in image analysis?",\n    "options": ["To create natural images", "To increase sunlight exposure", "To quantify vegetation characteristics", "To remove background noise"],\n    "answer": 3\n    },\n    {\n    "question": "What does the Near-Infrared (NIR) wavelength reflectance in vegetation vary with?",\n    "options": ["Leaf thickness and coating", "Leaf color", "Plant height", "Number of leaves"],\n    "answer": 1\n    },\n    {\n    "question": "What is the purpose of using NDVI in remote sensing applications?",\n    "options": ["To add noise to the images", "To remove vegetation from images", "To estimate vegetation productivity and health", "To reduce image resolution"],\n    "answer": 3\n    },\n    {\n    "question": "How does NDVI differ from a simple ratio in image analysis?",\n    "options": ["NDVI uses only red light, while the simple ratio uses all spectral bands", "NDVI is a linear transform of the simple ratio", "NDVI is affected by absolute pixel values in different bands", "Simple ratios remove multiplicative noise from images"],\n    "answer": 2\n    }\n]```"""


if __name__ == "__main__":
    manager = ChatCompletionManager()
    
    # testJSON = manager.responseToJson(testJSONStr)
    # print("testJSON:\n", testJSON)
    # print("testJSON[-1]:\n", testJSON[-1])
    
    # response = manager.questionsNoHistory(example_notes)
    # print("response:\n", response)
    # print(f"\nmessage:\n{response.choices[0].message.content}\n")
    # print("\n\n")
    # manager.questions_with_history(example_notes)




# EXAMPLE CHAT COMPLETION:

# ChatCompletion(
    # id='chatcmpl-9PAb00yo0JFYquLDNxpV9IqMY1vK2', 
    # choices=[
        # Choice(finish_reason='stop', 
        # index=0, 
        # logprobs=None, 
        # message=ChatCompletionMessage(
            # content='```{\n    {\n    "question": "What operation on images is typically used to reduce noise?",\n    "options": ["Multiplication", "Addition", "Subtraction", "Division"],\n    "answer": 2\n    },\n    {\n    "question": "What is the main purpose of using Vegetation Index (VI) in image analysis?",\n    "options": ["To create natural images", "To increase sunlight exposure", "To quantify vegetation characteristics", "To remove background noise"],\n    "answer": 3\n    },\n    {\n    "question": "What does the Near-Infrared (NIR) wavelength reflectance in vegetation vary with?",\n    "options": ["Leaf thickness and coating", "Leaf color", "Plant height", "Number of leaves"],\n    "answer": 1\n    },\n    {\n    "question": "What is the purpose of using NDVI in remote sensing applications?",\n    "options": ["To add noise to the images", "To remove vegetation from images", "To estimate vegetation productivity and health", "To reduce image resolution"],\n    "answer": 3\n    },\n    {\n    "question": "How does NDVI differ from a simple ratio in image analysis?",\n    "options": ["NDVI uses only red light, while the simple ratio uses all spectral bands", "NDVI is a linear transform of the simple ratio", "NDVI is affected by absolute pixel values in different bands", "Simple ratios remove multiplicative noise from images"],\n    "answer": 2\n    }\n}```', 
            # role='assistant', 
            # function_call=None, 
            # tool_calls=None
            # )
        # )
    # ], 
    # created=1715785958, 
    # model='gpt-3.5-turbo-0125', 
    # object='chat.completion', 
    # system_fingerprint=None, 
    # usage=CompletionUsage(
        # completion_tokens=315, 
        # prompt_tokens=985, 
        # total_tokens=1300
    # )
# )