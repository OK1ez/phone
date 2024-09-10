interface BleetContentProps {
  content: string;
  image?: string | null;
}

export function BleetContent({ content, image }: BleetContentProps) {
    return (
      <div>
        <p>{content}</p>
        {image && (
          <div className="mt-1">
            <img className="border rounded-lg" src={image} alt="bleeter-image" />
          </div>
        )}
      </div>
    );
  }
  