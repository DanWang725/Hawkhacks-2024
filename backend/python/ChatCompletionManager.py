from openai import OpenAI
from dotenv import load_dotenv

# TODO: Move this to a separate file
OpenAiInitialSystemMessage = """
You are going to play the role of a professor writing a test for your students. It will be in the form of a multiple choice test.
You will be given notes taken from your course and you will have to write a test based on these notes summaries.

In addition, you must follow the following rules no matter what:
1. Respond only with a JSON object. The JSON object must be surrounded by three tick marks and be in the following format:
```{
    {
    "question": "One of the questions you made here",
    "options": ["option 1", "option 2", "option 3", "option 4"],
    "answer": 1
    "explanation": "A short sentence explaining the correct answer, and pointing out how the other options are incorrect."
    }, ...
}```
where "answer" is the index of the correct response in the "options" array from 0 to 3.

2. You must ask around 15 questions unless the notes are so short that it is not possible.

3. You must ask questions that are relevant to the notes provided, and that are answerable by a student who has studied the notes.

4. You must not ask questions that are too easy or too hard. The questions should be of medium difficulty.

5. You must not ask questions that are too similar to each other. Each question should test a different concept.

6. You must not ask questions that are too specific. The questions should be general enough to be answerable by any student who has studied the notes.
For example, you are forbidden from asking questions that have options that have no creativity and are pure memorization ["Step 1", "Step 2", "Step 3", "Step 4"].
7. 65% of the questions to be simple term based questions, 15% of them harder questions and 20% to be very challenging questions applying notes to real life situations.

8. Avoid questions that only require pure memorization of the given content, the questions should test deep understanding of the content being asked.

9. You must include at least 2 questions where the answer is the option of "It's a trick question!".

"""


class ChatCompletionManager:
    
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
        
        self.chatHistory.append({
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
        
        notes = self.normalize_quotes(notes)
        
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



    def questions_with_history(self, notes):
        if not notes:
            print("Error: Can not create questions without notes")
            return
        
        notes = self.normalize_quotes(notes)
        
        self.chatHistory.append(
            {
                "role": "user",
                "content": [{
                    "type": "text",
                    "text": "Now generate questions for these notes:\n" + notes
                }]
            }
        )
        
        # check if the chat history is not too long
        
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




example_notes = """
Arithmetic Operations
- Addition, Multiplication, Subtraction and Division done on images
- Addition is a form of averaging, usually used to reduce noise
- Subtraction is used to reveal differences between those images and is often used in the detection of change
- Multiplication involves floating point DNs, if one image is Boolean the result is a **masking op**
- Division (Ratioing) is one of the most common ops, and is used heavily in vegetation indices

Vegetation Transformations (Indices)

- Vegetation Index (VI) is a “synthetic (not natural) image layer” which is created using existing bands of a multispectral image
- Provides us information that is unique and cannot be found in any other individual bands
- It *maximizes sensitivity* to plant biophysical parameters, and it *normalizes* impacts of sun angle, canopy background, topography, soil variations
    - it enables us to see vegetation much more apparently in the new image layer
- VI is used to quantify/predict vegetation biomass (weight of plant in a given area), productivity (healthiness), leaf area (coverage), and/or vegetative ground cover
- VI's are mainly a combination of the red and near-infrared bands, but this is not always the case

Leaf Cell Structure
- The Near-Infrared (NIR) wavelength reflectance is controlled by the leaf's cell structure
- The amount of reflectance varies with:
    - Leaf Age
    - Health
    - Species
- The reflectance is also related to:
    - leaf thickness and coating
    - woody tissue
    - water content
- Healthy vegetation absorbs blue- and red-light energy to fuel *photosynthesis* and create *chlorophyll*. A plant with more chlorophyll will **reflect more near-infrared energy** than an unhealthy plant.

Simple Ratios and NDVI (**Normalized Difference** Vegetation Index)
- The simple ratio takes advantage of the inverse relationship between the chlorophyll absorption of the red radiant energy and increased reflectance of near-infrared (NIR) energy for healthy plant canopies
- The NIR/Red ratio helps to produce an greyscale image showing variation in biomass (the amount of vegetative matter) and in LAI (**Leaf Area Index**) as well as the state of health (physiological functioning) of plants (magnitude of value will be greater than 1)
- NDVI is used for estimating net primary production over varying biome types, monitor patterns of vegetative surface, and assess the length of growing seasons
- Seasonal and interannual changes can be monitored using the NDVI ratio
- Removes multiplicative noise (illumination differences, cloud shadow, and topographic variation)
- The fact that sums and differences of bands are used in the NDVI rather than absolute values may make the NDVI more appropriate for use in studies *where comparisons over time for a single area are involved*
    - **ratio value is not affected by the absolute pixel values in the NIR and R bands**
- The NDVI is functionally equivalent to and is a nonlinear transform of the simple ratio
"""


if __name__ == "__main__":
    manager = ChatCompletionManager()
    
    response = manager.questions_no_history(example_notes)
    print("response:\n", response)
    print(f"\nmessage:\n{response.choices[0].message.content}\n")
    # print("\n\n")
    # manager.questions_with_history(example_notes)

