import axios from "axios";
import { IRandomImageResponse, IMultipleRandomImageResponse } from "../components/models";

async function getRandomImage(): Promise<IRandomImageResponse> {
    const { data } = await axios.get(
        `https://dog.ceo/api/breeds/image/random`
    );
    return data;
}

async function getMultipleRandomImage(numberOfImages: number): Promise<IMultipleRandomImageResponse> {
    const { data } = await axios.get(
        `https://dog.ceo/api/breeds/image/random/${numberOfImages}`
    );
    return data
}

export { getRandomImage, getMultipleRandomImage }