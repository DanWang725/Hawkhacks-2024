from openai import OpenAI, AsyncOpenAI
from dotenv import load_dotenv
from pydantic import BaseModel, Field, RootModel
from typing import List, Union


class MultiChoiceQuestionSchema(BaseModel):
    # type: str = Field("multiple_choice", Literal=True)
    question: str
    options: List[str] #= Field(..., min_items=4, max_items=4)
    answer: int #= Field(int, ge=0, le=3) # int from 0 to 3
    explanation: str

class SelectAllAnswerIndex(BaseModel):
    index: int #= Field(int, ge=0)

class SelectAllQuestionSchema(BaseModel):
    type: str = Field("select_all", Literal=True)
    question: str
    options: List[str] #= Field(..., min_items=2, max_items=5)  # Minimum of 2 options for select all
    answers: List[SelectAllAnswerIndex]
    explanation: str

class TrueFalseQuestionSchema(BaseModel):
    type: str = Field("true_false", Literal=True)
    question: str
    answer: bool
    explanation: str

class QuestionSchema(RootModel[Union[MultiChoiceQuestionSchema, SelectAllQuestionSchema, TrueFalseQuestionSchema]]):
    pass

class QuizSchema(BaseModel):
    # TODO: Change this to QuestionSchema to accept multiple types of questions
    questions: List[MultiChoiceQuestionSchema]

QuizSchema.model_rebuild()

class Response(BaseModel):
    quiz: QuizSchema

OpenAiInitialSystemMessage = """
You are going to play the role of a professor writing a test for your students. It will be in the form of a multiple choice test.
You will be given notes taken from your course from one unit at a time. Your task is to write a challenging test for your students based on these notes.

In addition, you must follow the following rules no matter what:
1. You must ask around 10 questions unless the notes are so short that it is not possible.

2. You must ask questions that are relevant to the notes provided, and that are answerable by a student who has studied the notes.

3. You must not ask questions that are too easy or too hard. The questions should be of medium difficulty.

4. You must not ask questions that are too similar to each other. Each question should test a different concept.

5. You must not ask questions that are too specific to the format of the text. The questions should be general enough to be answerable by any student who has studied the notes.
For example, you are forbidden from asking questions that have options that have no creativity and are pure memorization like ["Step 1", "Step 2", "Step 3", "Step 4"].
6. 65% of the questions to be simple term based questions, 15% of them harder questions and 20% to be very challenging questions applying notes to real life situations.

7. Avoid questions that only require pure memorization of the given content, the questions should test deep understanding of the content being asked.

8. You must include at least 1 question where the answer is the option of "It's a trick question!", but you may choose to have more and it can still be the wrong answer.

9. Do not create questions in the same order than they appear in the notes.

10. If you are given multiple units, only create questions focused on the last unit given, but you may use the information from the previous units to gain context and understanding.

11. Do not mention or frame questions with the mention of the notes. For example, you cannot say "according to the notes?" at the end of a question.
"""

def normalizeQuotes(text):
    quotes = {
        '“': '"',
        '”': '"',
        '‘': "'",
        '’': "'",
    }
    for original, replacement in quotes.items():
        text = text.replace(original, replacement)
    return text


class Manager:
    
    chatHistory = []
    
    def __init__(self, model="gpt-4o-mini", org=None, proj=None):
        load_dotenv()
        
        # use gpt-4o-mini for everything
        # only gpt-4o once we actually can afford it
        self.model = model
        self.client = OpenAI(
            organization = org if not None else 'org-Wr0OcM4KbkxO8eDGbrgP7XxT',
            project = proj if not None else 'proj_e5BudJi0QmXDFk7zpXdHmPkP'
        )
        self.asyncClient = AsyncOpenAI(
            organization = org if not None else 'org-Wr0OcM4KbkxO8eDGbrgP7XxT',
            project = proj if not None else 'proj_e5BudJi0QmXDFk7zpXdHmPkP'
        )
        
        self.chatHistory.append({
            "role": "system",
            "content": OpenAiInitialSystemMessage,
        })


    
    def clearChatHistory(self):
        self.chatHistory = []
        self.chatHistory.append({
            "role": "system",
            "content": OpenAiInitialSystemMessage,
        })


    
    async def questionsNoHistory(self, notes):
        if not notes:
            print("Error: Can not create questions without any notes")
            return
        
        notes = normalizeQuotes(notes)
        
        message = [
            {
                "role": "system", 
                "content": OpenAiInitialSystemMessage
            },
            {
                "role": "user",
                "content": "Here are the notes:\n" + notes
            }
        ]
        
        print("Asking ChatGPT for questions without history...")
        openai_response = await self.asyncClient.beta.chat.completions.parse(
            model = self.model,
            messages = message,
            response_format = Response,
        )
        
        return openai_response



    def questionsWithHistory(self, notes):
        if not notes:
            print("Error: Can not create questions without notes")
            return
        
        notes = normalizeQuotes(notes)
        
        if len(self.chatHistory) <= 2:
            prefix = "Now generate questions for this first unit:\n"
        else:
            prefix = "Here are more notes for the next unit:\n"
        
        self.chatHistory.append(
            {
                "role": "user",
                "content": prefix + notes,
            }
        )
        
        # TODO: check if the chat history is not too long
        
        print("Asking ChatGPT for questions with history...")
        openai_response = self.client.beta.chat.completions.parse(
            model=self.model,
            messages=self.chatHistory,
            response_format = Response,
        )
        
        # Add this answer to our chat history
        self.chatHistory.append(
            {
                "role": openai_response.choices[0].message.role,
                "content": openai_response.choices[0].message.content,
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


if __name__ == "__main__":
    manager = Manager()
    
    # response = manager.questionsNoHistory(example_notes)
    # print("response:\n", response)
    # print(f"\nmessage:\n{response.choices[0].message.content}\n")
    # print("\n\n")
    # manager.questions_with_history(example_notes)