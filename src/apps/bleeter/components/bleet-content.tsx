export function BleetContent({ content, image }) {
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
  